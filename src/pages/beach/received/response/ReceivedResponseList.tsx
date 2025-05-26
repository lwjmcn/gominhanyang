import Appbar from '@/components/Appbar';
import LetterListItem from '@/components/LetterListItem';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRepliedLetters } from '@/lib/api/letter';
import { RepliedLetter } from '@/lib/type/letter.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import styles from '../letter/receivedletterlist.module.css';

export default function ReceivedResponseListPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [letters, setLetters] = useState<RepliedLetter[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLetters = async () => {
    setIsLoading(true);

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

      setLetters(response['replied-to-me']);
    } catch (error) {
      showToast('답장 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLetters();
  }, []);

  return (
    <div className={styles.pageBackground}>
      <Appbar title="받은 답장함" />
      <div>
        {isLoading || letters == undefined ? (
          <p>답장을 불러오는 중...</p>
        ) : letters.length === 0 ? (
          <p>아직 받은 답장이 없습니다.</p>
        ) : (
          letters.map(letter => (
            <LetterListItem
              letter={{
                _id: letter._id,
                title: letter.title,
                created_at: letter.replied_at,
                emotion: letter.emotion,
              }}
              key={letter._id}
              onClick={() => navigate(`/received/responses/${letter._id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
