import Appbar from '@/components/Appbar';
import styles from './letteremotion.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { EmotionType, SendType } from '@/lib/type/letter.type';
import { useState } from 'react';

export default function LetterEmotionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const prevState = location.state as { sendType: string };

  const [emotion, setEmotion] = useState<EmotionType | null>(null);

  const handleNextPage = (emotion: EmotionType) => {
    navigate('/letter/write', {
      state: {
        sendType: (prevState?.sendType as SendType) || SendType.SELF,
        emotion: emotion as EmotionType,
      },
    });
  };

  return (
    <div className={styles.pageBackground}>
      <Appbar title="" />
      <div className={styles.container}>
        <p className={styles.title}>어떤 감정을 표현하고 싶어?</p>

        <div className={styles.emotionContainer}>
          <div className={styles.emotionItem}>
            <img
              src="/image/write/emotion_excited.webp"
              alt="기쁨"
              onClick={() => handleNextPage(EmotionType.EXCITED)}
              className={emotion === EmotionType.EXCITED ? styles.selected : styles.emotionImage}
            />
            <div className={styles.emotionText}>기쁨</div>
          </div>
          <div className={styles.emotionItem}>
            <img
              src="/image/write/emotion_happy.webp"
              alt="행복"
              onClick={() => handleNextPage(EmotionType.HAPPY)}
              className={emotion === EmotionType.HAPPY ? styles.selected : styles.emotionImage}
            />
            <div className={styles.emotionText}>행복</div>
          </div>
          <div className={styles.emotionItem}>
            <img
              src="/image/write/emotion_bored.webp"
              alt="우울"
              onClick={() => handleNextPage(EmotionType.DEPRESSED)}
              className={emotion === EmotionType.DEPRESSED ? styles.selected : styles.emotionImage}
            />
            <div className={styles.emotionText}>우울</div>
          </div>
          <div className={styles.emotionItem}>
            <img
              src="/image/write/emotion_angry.webp"
              alt="화남"
              onClick={() => handleNextPage(EmotionType.ANGRY)}
              className={emotion === EmotionType.ANGRY ? styles.selected : styles.emotionImage}
            />
            <div className={styles.emotionText}>화남</div>
          </div>
          <div className={styles.emotionItem}>
            <img
              src="/image/write/emotion_sad.webp"
              alt="슬픔"
              onClick={() => handleNextPage(EmotionType.SAD)}
              className={emotion === EmotionType.SAD ? styles.selected : styles.emotionImage}
            />
            <div className={styles.emotionText}>슬픔</div>
          </div>
        </div>
      </div>
    </div>
  );
}
