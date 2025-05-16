import { useState } from 'react';
import Appbar from '@/components/Appbar';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './letterwrite.module.css';
import SpeechModal from './components/SpeechModal';
import StopWriteModal from './components/StopWriteModal';
import CompleteWriteModal from './components/CompleteWriteModal';
import { sendLetter } from '@/lib/api/letter';
import { EmotionType, SendType } from '@/lib/type/letter.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import { useAuthStore } from '@/store/auth';
import { grantReward } from '@/lib/api/reward';
import { ActionType } from '@/lib/type/reward.type';
import LetterWriteForm from '@/components/LetterWriteForm';

export default function LetterWritePage() {
  const nextButtonIcon = <img src="https://placehold.co/50x50" alt="question" />;

  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState<EmotionType>(EmotionType.HAPPY);
  const [isLoading, setIsLoading] = useState(false);

  const [openSpeech, setOpenSpeech] = useState(false);
  const [openStopWrite, setOpenStopWrite] = useState(false);
  const [openCompleteWrite, setOpenCompleteWrite] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToastStore();
  const state = location.state as { sendType: string };
  const [sendType, setSendType] = useState<SendType>(
    (state?.sendType as SendType) || SendType.SELF,
  );

  const handleSendLetter = async () => {
    if (content.length < 10) {
      showToast('편지는 최소 10자 이상 작성해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await sendLetter({
        from: 'master01',
        content,
        emotion,
        to: sendType,
      });

      if (!response) {
        showToast('알 수 없는 오류가 발생했습니다.');
        return;
      }

      if (isErrorResponse(response)) {
        showToast(response.error);
        return;
      }

      // 편지 길이에 따른 보상 지급
      let rewardAction = ActionType.WRITE;
      if (content.length >= 100) {
        rewardAction = ActionType.WRITE_LONG;
      }

      const rewardResponse = await grantReward({ action: rewardAction });

      if (isErrorResponse(rewardResponse)) {
        showToast(rewardResponse.error);
        return;
      }

      showToast('편지가 전송되었습니다.');
      navigate('/letter/complete', {
        state: {
          letterId: response.letter_id,
          sendType,
          rewardItems: rewardResponse.new_items,
          rewardAction,
        },
      });
    } catch (error) {
      showToast('편지 전송 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
      setOpenCompleteWrite(false);
    }
  };

  return (
    <div className={styles.page}>
      {openSpeech && (
        <SpeechModal
          onClose={() => setOpenSpeech(false)}
          type="letter"
          emotion={emotion}
          partialLetter={content.slice(-100)}
        />
      )}
      {openStopWrite && <StopWriteModal onClose={() => setOpenStopWrite(false)} type="letter" />}
      {openCompleteWrite && (
        <CompleteWriteModal
          onClose={() => setOpenCompleteWrite(false)}
          onConfirm={handleSendLetter}
          isLoading={isLoading}
          type="letter"
        />
      )}
      <Appbar
        title=""
        nextButtonIcon={nextButtonIcon}
        onBackPress={() => {
          setOpenStopWrite(true);
          return;
        }}
        onNextPress={() => setOpenSpeech(true)}
      />
      <div className={styles.container}>
        <div className={styles.radioContainer}>
          <input
            type="radio"
            id="option1"
            name="options"
            value={SendType.SELF}
            checked={sendType === SendType.SELF}
            onChange={e => setSendType(e.target.value as SendType)}
            disabled={isLoading}
          />
          <label htmlFor="option1">보관하기</label>
          <input
            type="radio"
            id="option2"
            name="options"
            value={SendType.RANDOM}
            checked={sendType === SendType.RANDOM}
            onChange={e => setSendType(e.target.value as SendType)}
            disabled={isLoading}
          />
          <label htmlFor="option2">랜덤 전송</label>
          <input
            type="radio"
            id="option3"
            name="options"
            value={SendType.VOLUNTEER}
            checked={sendType === SendType.VOLUNTEER}
            onChange={e => setSendType(e.target.value as SendType)}
            disabled={isLoading}
          />
          <label htmlFor="option3">온기우체부</label>
        </div>

        <div className={styles.emotionContainer}>
          <img
            src="https://placehold.co/100x100"
            alt="행복"
            onClick={() => setEmotion(EmotionType.HAPPY)}
            className={emotion === EmotionType.HAPPY ? styles.selected : ''}
          />
          <img
            src="https://placehold.co/100x100"
            alt="설렘"
            onClick={() => setEmotion(EmotionType.EXCITED)}
            className={emotion === EmotionType.EXCITED ? styles.selected : ''}
          />
          <img
            src="https://placehold.co/100x100"
            alt="우울"
            onClick={() => setEmotion(EmotionType.DEPRESSED)}
            className={emotion === EmotionType.DEPRESSED ? styles.selected : ''}
          />
          <img
            src="https://placehold.co/100x100"
            alt="화남"
            onClick={() => setEmotion(EmotionType.ANGRY)}
            className={emotion === EmotionType.ANGRY ? styles.selected : ''}
          />
          <img
            src="https://placehold.co/100x100"
            alt="불안"
            onClick={() => setEmotion(EmotionType.DEPRESSED)}
            className={emotion === EmotionType.DEPRESSED ? styles.selected : ''}
          />
        </div>

        <div className={styles.writeSection}>
          <LetterWriteForm content={content} onChange={setContent} disabled={isLoading} />
          <button
            className={styles.completeButton}
            onClick={() => setOpenCompleteWrite(true)}
            disabled={isLoading}
          >
            <img src="https://placehold.co/50x50" alt="complete" />
          </button>
        </div>
      </div>
    </div>
  );
}
