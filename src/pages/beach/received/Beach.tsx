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
  const [isLettersLoading, setIsLettersLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);

  const fetchLetters = async () => {
    setIsLettersLoading(true);

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
      setIsLettersLoading(false);
    }
  };

  const fetchComments = async () => {
    setIsCommentsLoading(true);

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
      setIsCommentsLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([fetchLetters(), fetchComments()]);
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
        onNextPress={() => navigate('/received/all')}
      />
      <div className={styles.container}>
        <div className={styles.otterContainer}>
          <div className={styles.speechBubble}>바다 너머에서 흘러온 마음을 열어볼래?</div>
          <div className={styles.otterImage}></div>
        </div>
        {/* 편지들 */}
        <div className={styles.lettersContainer}>
          {(isLettersLoading || isCommentsLoading) && (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>바다에서 편지가 흘러오는 중...</p>
            </div>
          )}
          {!isLettersLoading &&
            letters &&
            letters.slice(0, 3).map((letter, index) => {
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
          {!isCommentsLoading &&
            comments &&
            comments.slice(0, 1).map((comment, index) => {
              const top = Math.random() * 50;
              const left = Math.random() * 80;
              const size = 15 + (top / 100) * 15; // 아래에 있을수록 크기가 커짐
              const delay = Math.random() * 3;

              return (
                <button
                  key={`comment-${comment._id}`}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${size}rem`,
                    height: `${size}rem`,
                    animationDelay: `${delay}s`,
                  }}
                  className={styles.randomCommentButton}
                  onClick={() => navigate(`/received/responses/${comments[0]._id}`)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
