import Appbar from '@/components/Appbar';
import styles from './beach.module.css';
import { useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { getRandomLetters, getRepliedLetters } from '@/lib/api/letter';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import { Letter, RepliedLetter } from '@/lib/type/letter.type';

export default function BeachPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [letters, setLetters] = useState<Letter[] | undefined>(undefined);
  const [comments, setComments] = useState<RepliedLetter[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLetters = async () => {
    setIsLoading(true);

    try {
      const response = await getRandomLetters();

      if (!response) {
        showToast('알 수 없는 오류가 발생했습니다.');
        return;
      }

      if (isErrorResponse(response)) {
        showToast(response.error);
        return;
      }

      setLetters(response.unread_letters);
    } catch (error) {
      showToast('편지 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  const fetchComments = async () => {
    setIsLoading(true);

    try {
      const response = await getRepliedLetters();

      if (!response) {
        showToast('알 수 없는 오류가 발생했습니다.');
        return;
      }

      if (isErrorResponse(response)) {
        showToast(response.error);
        return;
      }

      setComments(response['replied-to-me']);
    } catch (error) {
      showToast('답장 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchLetters();
    fetchComments();
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
        onNextPress={() => navigate('/received/inbox-test')}
      />
      <div className={styles.container}>
        <div className={styles.otterContainer}>
          <div className={styles.speechBubble}>바다 너머에서 흘러온 마음을 열어볼래?</div>
          <div className={styles.otterImage}></div>
        </div>
        {/* 편지들 */}
        <div className={styles.lettersContainer}>
          {isLoading && (
            <div className={styles.loadingContainer}>
              <p>불러오는 중...</p>
            </div>
          )}
          {letters &&
            letters.slice(0, 2).map((letter, index) => (
              <button
                key={`letter-${letter._id}`}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 70 + 10}%`,
                  top: `${Math.random() * 60 + 20}%`,
                  height: `${Math.random() * 3 + 10}rem`,
                  width: 'max-content',
                }}
                className={styles.randomLetterButton}
                onClick={() => navigate(`/received/letters/${letter._id}`)}
              >
                <img
                  className={styles.boatIcon}
                  src="/image/beach/paperboat.webp"
                  alt={`흘러온 편지 ${index + 1}`}
                />
              </button>
            ))}
          {comments &&
            comments.slice(0, 2).map(comment => (
              <button
                key={`comment-${comment._id}`}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 60 + 20}%`,
                  height: `${Math.random() * 3 + 10}rem`,
                  width: 'auto',
                }}
                className={styles.randomLetterButton}
                onClick={() => navigate(`/received/responses/${comments[0]._id}`)}
              >
                <img
                  className={styles.bottleIcon}
                  src="/image/beach/responsebottle.webp"
                  alt="받은 답장"
                />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
