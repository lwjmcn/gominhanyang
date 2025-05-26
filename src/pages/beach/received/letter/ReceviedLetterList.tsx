import Appbar from '@/components/Appbar';
import LetterListItem from '@/components/LetterListItem';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRandomLetters } from '@/lib/api/letter';
import { Letter } from '@/lib/type/letter.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import styles from './receivedletterlist.module.css';

export default function ReceivedLetterListPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [letters, setLetters] = useState<Letter[]>([]);
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

  useEffect(() => {
    fetchLetters();
  }, []);

  return (
    <div className={styles.pageBackground}>
      <Appbar title="받은 편지함" />
      <div className={styles.container}>
        {isLoading ? (
          <p>편지를 불러오는 중...</p>
        ) : letters.length === 0 ? (
          <p>아직 받은 편지가 없습니다.</p>
        ) : (
          letters.map(letter => (
            <LetterListItem
              letter={{
                _id: letter._id,
                title: letter.title,
                emotion: letter.emotion,
                created_at: letter.created_at,
              }}
              key={letter._id}
              onClick={() => navigate(`/received/letters/${letter._id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
