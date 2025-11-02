import Appbar from '@/components/Appbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLetterDetail } from '@/lib/api/letter';
import { LetterDetail, Reply } from '@/lib/type/letter.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import styles from './receivedresponsedetail.module.css';
import { Textarea } from '@/components/Textarea';
// import { Satisfaction } from './component/Satisfaction';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Nothing } from '@/components/Nothing';
import { useLetterStore } from '@/store/letter';

export default function ReceivedResponseDetailPage() {
  const { responseId } = useParams();

  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [letter, setLetter] = useState<LetterDetail | null>(null);
  const [comments, setComments] = useState<Reply[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const { fetchSavedLetters } = useLetterStore();

  const fetchLetterDetail = async () => {
    if (!responseId) {
      showToast('편지 ID가 없습니다.');
      navigate(-1);
      return;
    }

    setIsLoading(true);

    try {
      const response = await getLetterDetail(responseId);

      if (!response) {
        showToast('알 수 없는 오류가 발생했습니다.');
        return;
      }

      if (isErrorResponse(response)) {
        showToast(response.error);
        return;
      }

      if (!response.comments) {
        showToast('답장을 찾을 수 없습니다.');
        return;
      }

      setLetter(response.letter);
      setComments(response.comments!);
    } catch (error) {
      showToast('편지를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLetterDetail();
    fetchSavedLetters(); // 보관함 편지 업데이트
  }, [responseId]);

  if (isLoading) {
    return (
      <div className={styles.pageBackground}>
        <Appbar title="답장 읽기" />
        <LoadingSpinner containerStyle={{ height: '100dvh' }} description="편지를 불러오는 중..." />
      </div>
    );
  }

  if (!letter) {
    return (
      <div className={styles.pageBackground}>
        <Appbar title="답장 읽기" />
        <Nothing containerStyle={{ height: '100dvh' }} description="편지를 찾을 수 없습니다." />
      </div>
    );
  }

  return (
    <div className={styles.pageBackground}>
      <Appbar title="답장 읽기" />
      <div className={styles.container}>
        <div className={styles.letterSection}>
          <p className={styles.date}>{letter.created_at.substring(0, 10)}</p>
          <h2 className={styles.title}>{letter.title}</h2>
          <Textarea type="letter" value={letter.content} disabled />
        </div>
        <hr className={styles.divider} />
        {isLoadingComments ? (
          <LoadingSpinner description="답장을 불러오는 중..." />
        ) : (
          <>
            {comments.map(comment => (
              <div key={comment._id} className={styles.commentItem}>
                <Textarea type="reply" value={comment.content} disabled />
              </div>
            ))}
            {/* <Satisfaction letterId={comments[0]._id} /> */}
          </>
        )}
      </div>
    </div>
  );
}
