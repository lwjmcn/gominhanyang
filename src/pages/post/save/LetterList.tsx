import { useEffect, useState } from 'react';
import Appbar from '@/components/Appbar';
import LetterListItem from '@/components/LetterListItem';
import { useNavigate } from 'react-router-dom';
import { getSavedLetters } from '@/lib/api/letter';
import { Letter } from '@/lib/type/letter.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import styles from './letterlist.module.css';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Nothing } from '@/components/Nothing';

export default function LetterListPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [letters, setLetters] = useState<Letter[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLetters = async () => {
    try {
      setIsLoading(true);
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

  useEffect(() => {
    fetchLetters();
  }, [showToast]);

  return (
    <div className={styles.pageBackground}>
      <Appbar title="나의 보관함" />
      {isLoading ? (
        <LoadingSpinner
          description="편지 목록을 불러오는 중..."
          containerStyle={{ height: '100dvh' }}
        />
      ) : letters.length === 0 ? (
        <Nothing
          description={`앗, 아직 저장된 편지가 없어요.${'\n'}편지를 작성하고 답장을 받아보세요.`}
          containerStyle={{ height: '100dvh' }}
        />
      ) : (
        <div className={styles.container}>
          {letters.map(letter => (
            <LetterListItem
              letter={letter}
              key={letter._id}
              onClick={() => navigate(`/letters/${letter._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
