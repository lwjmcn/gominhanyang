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
import { getMyReward, grantReward } from '@/lib/api/reward';
import { ActionType } from '@/lib/type/reward.type';
import LetterWriteForm from '@/components/LetterWriteForm';
import { generateQuestion, getHelpQuestion } from '@/lib/api/question';
import SpeechBubble from './components/SpeechBubble';
import { getMyItems } from '@/lib/api/item';
import { useItemStore } from '@/store/item';
import { usePointStore } from '@/store/point';

export default function LetterWritePage() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [firstTime, setFirstTime] = useState(true);
  const [openStopWrite, setOpenStopWrite] = useState(false);
  const [openCompleteWrite, setOpenCompleteWrite] = useState(false);

  const [helpMessages, setHelpMessages] = useState<string[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToastStore();
  const state = location.state as { sendType: string; emotion: EmotionType };
  const [sendType, setSendType] = useState<SendType>(
    (state?.sendType as SendType) || SendType.SELF,
  );
  const [emotion, setEmotion] = useState<EmotionType | null>(
    (state?.emotion as EmotionType) || null,
  );

  const { setItems } = useItemStore();
  const { setPoint, setLevel } = usePointStore();

  useEffect(() => {
    ReactGA.event('letter_start', {
      category: 'letter write',
      label: sendType,
      emotion: emotion,
      timestamp: new Date().toISOString(),
    });
    console.log('편지 쓰기 시작');
  }, []);

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
    ReactGA.event('letter_send', {
      category: 'letter write',
      label: sendType,
      emotion: emotion,
      value: content.length,
      timestamp: new Date().toISOString(),
    });
    console.log('편지 쓰기 완료');

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

      // 보상 포인트 추가
      const pointResponse = await getMyReward();
      if (isErrorResponse(pointResponse)) {
        showToast(pointResponse.error);
        return;
      }
      setPoint(pointResponse.point);
      setLevel(pointResponse.level);

      // 보상 아이템 추가
      if (rewardResponse.new_items.length > 0) {
        const response = await getMyItems();
        if (isErrorResponse(response)) {
          showToast(response.error);
          return;
        }
        setItems(response.items);
      }

      navigate('/letter/complete', {
        state: {
          sendType,
          message: rewardResponse.message,
          leveled_up: rewardResponse.leveled_up,
          rewardItems: rewardResponse.new_items,
        },
        replace: true,
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
      setHelpMessages(['감정을 선택해야 도움을 드릴 수 있어요.']);
      return;
    }

    const response = await generateQuestion({ emotion });

    if (isErrorResponse(response)) {
      showToast(response.error);
      return;
    }

    setHelpMessages([response.question]);
  };
  const fetchHelpQuestion = async () => {
    if (content.length == 0) {
      setHelpMessages(['편지를 쓰시면 그 내용을 기반으로 어떻게 이어가면 좋을지 추천해드릴게요.']);
      return;
    }
    const response = await getHelpQuestion({ partial_letter: content.slice(-100) });

    if (isErrorResponse(response)) {
      showToast(response.error);
      return;
    }

    setHelpMessages([response.help_question]);
  };

  const onRefresh = async () => {
    ReactGA.event('ai_help', {
      category: 'letter write',
    });

    setHelpMessages(['잠시만 기다려주세요...']);

    if (firstTime && content.length == 0) {
      fetchInitialQuestion();
      setFirstTime(false);
      return;
    }

    fetchHelpQuestion();
  };

  const handleChangeEmotion = (newEmotion: EmotionType) => {
    setEmotion(newEmotion);
    setFirstTime(true);
  };

  return (
    <div className={styles.page}>
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
        onBackPress={() => {
          setOpenStopWrite(true);
          return;
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
          <div className={styles.helpContainer}>
            <img
              className={styles.helpOtterImage}
              src="/image/write/otter_help.webp"
              alt="question"
              object-fit="cover"
            />
            <div className={styles.speechBubbleContainer}>
              <SpeechBubble emotion={emotion} onRefresh={onRefresh} helpMessages={helpMessages} />
            </div>
          </div>
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
