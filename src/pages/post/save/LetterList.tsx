import { useEffect } from 'react';
import Appbar from '@/components/Appbar';
import LetterListItem from '@/components/LetterListItem';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '@/store/toast';
import { useLetterStore } from '@/store/letter';
import styles from './letterlist.module.css';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Nothing } from '@/components/Nothing';

export default function LetterListPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const { savedLetters, isLoading, fetchSavedLetters } = useLetterStore();

  useEffect(() => {
    if (savedLetters.length === 0 && !isLoading)
      fetchSavedLetters().catch(error => {
        showToast(error.message || '편지 목록을 불러오는데 실패했습니다.');
      });
  }, []);

  return (
    <div className={styles.pageBackground}>
      <Appbar title="나의 보관함" />
      {isLoading ? (
        <LoadingSpinner
          description="편지 목록을 불러오는 중..."
          containerStyle={{ height: '100dvh' }}
        />
      ) : savedLetters.length === 0 ? (
        <Nothing
          description={`앗, 아직 저장된 편지가 없어요.${'\n'}편지를 작성하고 답장을 받아보세요.`}
          containerStyle={{ height: '100dvh' }}
        />
      ) : (
        <div className={styles.container}>
          {savedLetters.map(letter => (
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
