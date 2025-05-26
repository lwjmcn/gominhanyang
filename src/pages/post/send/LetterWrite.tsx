import { useState, useEffect } from 'react';
import Appbar from '@/components/Appbar';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './letterwrite.module.css';
import ReactGA from 'react-ga4';
import SpeechModal from './components/SpeechModal';
import StopWriteModal from './components/StopWriteModal';
import CompleteWriteModal from './components/CompleteWriteModal';
import { sendLetter } from '@/lib/api/letter';
import { EmotionType, SendType } from '@/lib/type/letter.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import { grantReward } from '@/lib/api/reward';
import { ActionType } from '@/lib/type/reward.type';
import LetterWriteForm from '@/components/LetterWriteForm';
import { generateQuestion, getHelpQuestion } from '@/lib/api/question';

export default function LetterWritePage() {
  const nextButtonIcon = (
    <img
      src="/image/write/otter_help.webp"
      alt="question"
      object-fit="cover"
      style={{ width: 'auto', height: '100%' }}
    />
  );

  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState<EmotionType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [openSpeech, setOpenSpeech] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const [openStopWrite, setOpenStopWrite] = useState(false);
  const [openCompleteWrite, setOpenCompleteWrite] = useState(false);

  const [helpMessages, setHelpMessages] = useState<string[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToastStore();
  const state = location.state as { sendType: string };
  const [sendType, setSendType] = useState<SendType>(
    (state?.sendType as SendType) || SendType.SELF,
  );

  const handleSendLetter = async () => {
    if (emotion === null) {
      showToast('감정을 선택해주세요.');
      return;
    }
    if (content.length < 10) {
      showToast('편지는 최소 10자 이상 작성해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await sendLetter({
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
          sendType,
          message: rewardResponse.message,
          leveled_up: rewardResponse.leveled_up,
          rewardItems: rewardResponse.new_items,
        },
      });
    } catch (error) {
      showToast('편지 전송 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
      setOpenCompleteWrite(false);
    }
  };

  const fetchInitialQuestion = async () => {
    if (emotion === null) {
      showToast('감정을 선택해주세요.');
      return;
    }

    const response = await generateQuestion({ emotion });

    if (isErrorResponse(response)) {
      showToast(response.error);
      return;
    }

    setHelpMessages([response.question]);
  };

  const updateQuestion = async () => {
    if (content.length == 0) {
      showToast('작성한 내용이 없습니다');
      return;
    }
    const response = await getHelpQuestion({ partial_letter: content.slice(-100) });

    if (isErrorResponse(response)) {
      showToast(response.error);
      return;
    }

    setHelpMessages([response.help_question]);
  };

  const handleChangeEmotion = (newEmotion: EmotionType) => {
    setEmotion(newEmotion);
    setFirstTime(true);
  };

  useEffect(() => {
    if (firstTime) {
      fetchInitialQuestion();
    }
  }, [emotion]);

  return (
    <div className={styles.page}>
      {openSpeech && (
        <SpeechModal
          onClose={() => {
            setOpenSpeech(false);
            setFirstTime(false);
          }}
          type="letter"
          helpMessages={helpMessages}
          onRefresh={updateQuestion}
        />
      )}
      {openStopWrite && <StopWriteModal onClose={() => setOpenStopWrite(false)} type="letter" />}
      {openCompleteWrite && (
        <CompleteWriteModal
          onClose={() => setOpenCompleteWrite(false)}
          onConfirm={handleSendLetter}
          isLoading={isLoading}
          type="letter"
          content={content}
          sendType={sendType}
        />
      )}
      <Appbar
        title=""
        nextButtonIcon={nextButtonIcon}
        onBackPress={() => {
          setOpenStopWrite(true);
          return;
        }}
        onNextPress={() => {
          setOpenSpeech(true);
          ReactGA.event('ai_help', {
            category: 'letter write',
          });
        }}
      />
      <div className={styles.container}>
        <div className={styles.radioContainer}>
          <div>
            <input
              type="radio"
              id="option1"
              name="options"
              value={SendType.SELF}
              checked={sendType === SendType.SELF}
              onChange={e => setSendType(e.target.value as SendType)}
              disabled={isLoading}
            />
            <label htmlFor="option1">
              <img
                className={styles.labelImg}
                object-fit="cover"
                src="/image/post/paper_love.webp"
                alt="self"
              />
              보관함
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="option2"
              name="options"
              value={SendType.RANDOM}
              checked={sendType === SendType.RANDOM}
              onChange={e => setSendType(e.target.value as SendType)}
              disabled={isLoading}
            />
            <label htmlFor="option2">
              <img
                className={styles.labelImg}
                object-fit="cover"
                src="/image/post/person.webp"
                alt="self"
              />
              익명 친구
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="option3"
              name="options"
              value={SendType.VOLUNTEER}
              checked={sendType === SendType.VOLUNTEER}
              onChange={e => setSendType(e.target.value as SendType)}
              disabled={isLoading}
            />
            <label htmlFor="option3">
              <img
                className={styles.labelImg}
                object-fit="cover"
                src="/image/post/post_office_yellow.webp"
                alt="self"
              />
              온기우체부
            </label>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.emotionContainer}>
          <img
            src="/image/write/emotion_excited.webp"
            object-fit="cover"
            alt="기쁨"
            onClick={() => handleChangeEmotion(EmotionType.EXCITED)}
            className={emotion === EmotionType.EXCITED ? styles.selected : ''}
          />
          <img
            src="/image/write/emotion_happy.webp"
            object-fit="cover"
            alt="행복"
            onClick={() => handleChangeEmotion(EmotionType.HAPPY)}
            className={emotion === EmotionType.HAPPY ? styles.selected : ''}
          />
          <img
            src="/image/write/emotion_bored.webp"
            object-fit="cover"
            alt="우울"
            onClick={() => handleChangeEmotion(EmotionType.DEPRESSED)}
            className={emotion === EmotionType.DEPRESSED ? styles.selected : ''}
          />
          <img
            src="/image/write/emotion_angry.webp"
            object-fit="cover"
            alt="화남"
            onClick={() => handleChangeEmotion(EmotionType.ANGRY)}
            className={emotion === EmotionType.ANGRY ? styles.selected : ''}
          />
          <img
            src="/image/write/emotion_sad.webp"
            object-fit="cover"
            alt="슬픔"
            onClick={() => handleChangeEmotion(EmotionType.SAD)}
            className={emotion === EmotionType.SAD ? styles.selected : ''}
          />
        </div>

        <div className={styles.writeSection}>
          <LetterWriteForm
            content={content}
            onChange={setContent}
            disabled={isLoading}
            onSend={() => setOpenCompleteWrite(true)}
            type="letter"
          />
        </div>
      </div>
    </div>
  );
}
