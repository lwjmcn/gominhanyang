import Appbar from '@/components/Appbar';
import styles from './beach.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToastStore } from '@/store/toast';
import { useLetterStore } from '@/store/letter';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function BeachPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const {
    receivedLetters,
    receivedReplies,
    isReceivedLettersLoading,
    isReceivedRepliesLoading,
    fetchReceivedLetters,
    fetchReceivedReplies,
  } = useLetterStore();
  const [otterClicked, setOtterClicked] = useState(false);

  useEffect(() => {
    Promise.all([
      fetchReceivedLetters().catch(error => {
        showToast(error.message || '편지 목록을 불러오는 중 오류가 발생했습니다.');
      }),
      fetchReceivedReplies().catch(error => {
        showToast(error.message || '답장 목록을 불러오는 중 오류가 발생했습니다.');
      }),
    ]);
  }, []);

  return (
    <div className={styles.pageBackground}>
      <Appbar
        title=""
        nextButtonIcon={
          <img
            src="/image/beach/ListIcon.webp"
            alt="받은 답장"
            object-fit="cover"
            style={{ height: '80%', width: 'auto', marginTop: '10%' }}
          />
        }
        onNextPress={() => navigate('/received')}
      />
      <div className={styles.container}>
        <div
          className={styles.otterContainer}
          onClick={() => {
            setOtterClicked(true);
            setTimeout(() => setOtterClicked(false), 2000);
          }}
        >
          <div className={`${styles.speechBubble} ${otterClicked ? styles.bubbleAnimation : ''}`}>
            <p>바다 너머에서{'\n'}흘러온 마음을 열어보실래요?</p>
          </div>
          <div className={styles.otterImage}></div>
        </div>
        {/* 편지들 */}
        <div className={styles.lettersContainer}>
          {(isReceivedLettersLoading || isReceivedRepliesLoading) && (
            <LoadingSpinner spinnerSize={3} description="바다에서 편지가 흘러오는 중..." />
          )}
          {!isReceivedLettersLoading &&
            receivedLetters &&
            receivedLetters.slice(0, 3).map(letter => {
              // 랜덤 위치 생성
              const top = Math.random() * 50;
              const left = Math.random() * 80;
              const size = 15 + (top / 100) * 15; // 아래에 있을수록 크기가 커짐
              const delay = Math.random() * 3;

              return (
                <button
                  key={`letter-${letter._id}`}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${size}rem`,
                    height: `${size}rem`,
                    animationDelay: `${delay}s`,
                  }}
                  className={styles.randomLetterButton}
                  onClick={() => navigate(`/received/letters/${letter._id}`)}
                />
              );
            })}
          {!isReceivedRepliesLoading &&
            receivedReplies &&
            receivedReplies.slice(0, 1).map(reply => {
              const top = Math.random() * 50;
              const left = Math.random() * 80;
              const size = 15 + (top / 100) * 15; // 아래에 있을수록 크기가 커짐
              const delay = Math.random() * 3;

              return (
                <button
                  key={`comment-${reply._id}`}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${size}rem`,
                    height: `${size}rem`,
                    animationDelay: `${delay}s`,
                  }}
                  className={styles.randomCommentButton}
                  onClick={() => navigate(`/received/responses/${reply._id}`)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
