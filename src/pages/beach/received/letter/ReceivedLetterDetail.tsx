import Appbar from '@/components/Appbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLetterDetail } from '@/lib/api/letter';
import { LetterDetail } from '@/lib/type/letter.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import styles from './receivedletterdetail.module.css';
import { Textarea } from '@/components/Textarea';

export default function ReceivedLetterDetailPage() {
  const { letterId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [letter, setLetter] = useState<LetterDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLetterDetail = async () => {
    if (!letterId) {
      showToast('편지 ID가 없습니다.');
      navigate(-1);
      return;
    }

    setIsLoading(true);

    try {
      const response = await getLetterDetail(letterId);

      if (!response) {
        showToast('알 수 없는 오류가 발생했습니다.');
        return;
      }

      if (isErrorResponse(response)) {
        showToast(response.error);
        return;
      }

      setLetter(response.letter);
    } catch (error) {
      showToast('편지를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLetterDetail();
  }, [letterId]);

  if (isLoading) {
    return (
      <div className={styles.pageBackground}>
        <Appbar title="편지 읽기" />
        <div className={styles.container}>
          <p>편지를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!letter) {
    return (
      <div className={styles.pageBackground}>
        <Appbar title="편지 읽기" />

        <p>편지를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.pageBackground}>
      <Appbar title="편지 읽기" />
      <div className={styles.container}>
        <p>{new Date(letter.created_at).toLocaleDateString()}</p>
        <h2>{letter.title}</h2>
        <Textarea type="letter" disabled value={letter.content} wrapperStyles={{ flex: 1 }} />
        <div className={styles.flexContainer}>
          <p className={styles.helperText}>
            {'당신의 한 마디가 큰 힘이 돼요.\n답장으로 마음을 전해보세요.'}
          </p>
          <button
            className={styles.replyButton}
            onClick={() =>
              navigate(`/received/letters/${letterId}/write`, {
                state: {
                  letter: letter,
                },
              })
            }
          >
            <img
              src="/image/beach/reply.webp"
              alt="답장하기"
              object-fit="cover"
              className={styles.replyIcon}
            />
            <span className={styles.replyText}>답장하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
