import Appbar from '@/components/Appbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLetterDetail } from '@/lib/api/letter';
import { LetterDetail, Reply } from '@/lib/type/letter.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import styles from './receivedresponsedetail.module.css';

export default function ReceivedResponseDetailPage() {
  const { responseId } = useParams();

  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [letter, setLetter] = useState<LetterDetail | null>(null);
  const [comments, setComments] = useState<Reply[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

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

      setLetter(response.letter);
      setComments(response.comments || []);
    } catch (error) {
      showToast('편지를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLetterDetail();
  }, [responseId]);

  if (isLoading) {
    return (
      <>
        <Appbar title="답장 읽기" />
        <div>
          <p>편지를 불러오는 중...</p>
        </div>
      </>
    );
  }

  if (!letter) {
    return (
      <>
        <Appbar title="답장 읽기" />
        <div>
          <p>편지를 찾을 수 없습니다.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Appbar title="답장 읽기" />
      <div className={styles.container}>
        <div className={styles.letterContainer}>
          <p>{new Date(letter.created_at).toLocaleDateString()}</p>
          <h2>{letter.title}</h2>
          <p>{letter.content}</p>
        </div>
        <hr />
        <div className={styles.commentsContainer}>
          {isLoadingComments ? (
            <p>답장을 불러오는 중...</p>
          ) : comments.length === 0 ? (
            <p>아직 답장이 없습니다.</p>
          ) : (
            comments.map(comment => (
              <div key={comment._id} className={styles.commentItem}>
                <div className={styles.commentHeader}>
                  <p className={styles.commentAuthor}>{comment.from}</p>
                  <p className={styles.commentDate}>
                    {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                </div>
                <p className={styles.commentContent}>{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
