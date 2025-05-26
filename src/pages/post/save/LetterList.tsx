import { useEffect, useState } from 'react';
import Appbar from '@/components/Appbar';
import LetterListItem from '@/components/LetterListItem';
import { useNavigate } from 'react-router-dom';
import { getSavedLetters } from '@/lib/api/letter';
import { Letter } from '@/lib/type/letter.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import styles from './letterlist.module.css';

export default function LetterListPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [letters, setLetters] = useState<Letter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const response = await getSavedLetters();
        if (isErrorResponse(response)) {
          showToast(response.error);
          return;
        }
        setLetters(response.saved_letters);
      } catch (error) {
        showToast('편지 목록을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLetters();
  }, [showToast]);

  return (
    <div className={styles.pageBackground}>
      <Appbar title="나의 보관함" />

      <div className={styles.container}>
        {isLoading ? (
          <div className={styles.loading}>편지를 불러오는 중...</div>
        ) : letters.length === 0 ? (
          <div className={styles.empty}>저장된 편지가 없습니다.</div>
        ) : (
          letters.map(letter => (
            <LetterListItem
              letter={letter}
              key={letter._id}
              onClick={() => navigate(`/letters/${letter._id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
