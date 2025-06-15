import { useEffect } from 'react';
import Appbar from '@/components/Appbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useToastStore } from '@/store/toast';
import { useLetterStore } from '@/store/letter';
import styles from './letterdetail.module.css';
import { Textarea } from '@/components/Textarea';
import { Satisfaction } from '@/pages/beach/received/response/component/Satisfaction';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Nothing } from '@/components/Nothing';
import { EmotionIcon } from '@/lib/type/letter.type';

export default function LetterDetailPage() {
  const { letterId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const { letterDetails, isLetterDetailLoading, fetchLetterDetail } = useLetterStore();

  useEffect(() => {
    if (!letterId) {
      showToast('편지 ID가 올바르지 않습니다.');
      navigate('/letters');
      return;
    }

    fetchLetterDetail(letterId).catch(error => {
      showToast(error.message || '편지 정보를 불러오는데 실패했습니다.');
    });
  }, [letterId]);

  if (isLetterDetailLoading) {
    return (
      <div className={styles.pageBackground}>
        <Appbar title="편지 읽기" />
        <LoadingSpinner
          description="편지 정보를 불러오는 중..."
          containerStyle={{ height: '100dvh' }}
        />
      </div>
    );
  }

  const letterData = letterId ? letterDetails.get(letterId) : null;
  if (!letterData) {
    return (
      <div className={styles.pageBackground}>
        <Appbar title="편지 읽기" />
        <Nothing
          description="편지 정보를 찾을 수 없습니다."
          containerStyle={{ height: '100dvh' }}
        />
      </div>
    );
  }

  const { letter, comments } = letterData;

  return (
    <div className={styles.pageBackground}>
      <Appbar title="편지 읽기" />
      <div className={styles.container}>
        <div className={styles.metadata}>
          <p>{new Date(letter.created_at).toLocaleDateString()}</p>
          <img
            src={`/image/write/emotion_${EmotionIcon[letter.emotion]}.webp`}
            alt={letter.emotion}
            className={styles.emotionIcon}
          />
        </div>

        <h2>{letter.title}</h2>
        <Textarea type="letter" disabled value={letter.content} />

        {comments.length > 0 && (
          <>
            <hr className={styles.divider} />
            <div className={styles.comments}>
              {comments.map(comment => (
                <div key={comment._id} className={styles.commentItem}>
                  <Textarea type="reply" value={comment.content} disabled />
                </div>
              ))}
              <Satisfaction letterId={comments[0]._id} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
