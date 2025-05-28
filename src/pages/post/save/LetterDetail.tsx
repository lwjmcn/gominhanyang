import { useEffect, useState } from 'react';
import Appbar from '@/components/Appbar';
import { useNavigate, useParams } from 'react-router-dom';
import { getLetterDetail, getLetterComments } from '@/lib/api/letter';
import { LetterDetail, Reply } from '@/lib/type/letter.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import styles from './letterdetail.module.css';
import { Textarea } from '@/components/Textarea';

export default function LetterDetailPage() {
  const { letterId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [letter, setLetter] = useState<LetterDetail | null>(null);
  const [comments, setComments] = useState<Reply[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLetterDetail = async () => {
      if (!letterId) {
        showToast('편지 ID가 올바르지 않습니다.');
        navigate('/letters');
        return;
      }

      try {
        const response = await getLetterDetail(letterId);
        if (isErrorResponse(response)) {
          showToast(response.error);
          navigate('/letters');
          return;
        }
        setLetter({
          ...response.letter,
          reply: response.comments?.[0], // ✅ 첫 번째 답장을 letter.reply에 포함
        });
        setComments(response.comments || []);
      } catch (error) {
        showToast('편지 정보를 불러오는데 실패했습니다.');
        navigate('/letters');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLetterDetail();
  }, [letterId]);

  if (isLoading) {
    return (
      <div className={styles.pageBackground}>
        <Appbar title="편지 읽기" />
        <p className={styles.container}>편지를 불러오는 중...</p>
      </div>
    );
  }

  if (!letter) {
    return null;
  }

  return (
    <div className={styles.pageBackground}>
      <Appbar title="편지 읽기" />
      <div className={styles.container}>
        <div className={styles.metadata}>
          <p>{new Date(letter.created_at).toLocaleDateString()}</p>
          <span className={styles.emotion}>{letter.emotion}</span>
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}
