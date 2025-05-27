import { useState, useEffect } from 'react';
import Appbar from '@/components/Appbar';
import LetterListItem from '@/components/LetterListItem';
import { useNavigate } from 'react-router-dom';
import { getRandomLetters, getRepliedLetters } from '@/lib/api/letter';
import { Letter, RepliedLetter } from '@/lib/type/letter.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import styles from '../letter/inbox.module.css';

export default function ReceivedInboxPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [tab, setTab] = useState<'letter' | 'reply'>('letter');
  const [letters, setLetters] = useState<Letter[]>([]);
  const [replies, setReplies] = useState<RepliedLetter[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (tab === 'letter') {
        const response = await getRandomLetters();
        if (!response || isErrorResponse(response)) {
          showToast(response?.error ?? '편지를 불러오는 중 오류 발생');
          return;
        }
        setLetters(response.unread_letters ?? []);
      } else {
        const response = await getRepliedLetters();
        if (!response || isErrorResponse(response)) {
          showToast(response?.error ?? '답장을 불러오는 중 오류 발생');
          return;
        }
        setReplies(response['replied-to-me'] ?? []);
      }
    } catch {
      showToast('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tab]);

  return (
    <div className={styles.pageBackground}>
      <Appbar title="" />
      <div className={styles.tabWrapper}>
        <div className={styles.tabContainer}>
          <button
            className={tab === 'letter' ? styles.activeTab : styles.inactiveTab}
            onClick={() => setTab('letter')}
          >
            <img src="/image/beach/boat.webp" alt="편지" className={styles.lettericon} />
            편지
          </button>
          <button
            className={tab === 'reply' ? styles.activeTab : styles.inactiveTab}
            onClick={() => setTab('reply')}
          >
            <img src="/image/beach/jar.webp" alt="답장" className={styles.jaricon} />
            답장
          </button>
          <div
            className={styles.slider}
            style={{
              transform: tab === 'letter' ? 'translateX(0%)' : 'translateX(100%)',
            }}
          />
        </div>
      </div>

      <div className={styles.container}>
        {isLoading ? (
          <p>{tab === 'letter' ? '편지를 불러오는 중...' : '답장을 불러오는 중...'}</p>
        ) : tab === 'letter' ? (
          letters.length === 0 ? (
            <p>아직 받은 편지가 없습니다.</p>
          ) : (
            letters.map(letter => (
              <LetterListItem
                key={letter._id}
                letter={{
                  _id: letter._id,
                  title: letter.title,
                  created_at: letter.created_at,
                  emotion: letter.emotion,
                }}
                onClick={() => navigate(`/received/letters/${letter._id}`)}
              />
            ))
          )
        ) : replies.length === 0 ? (
          <p>아직 받은 답장이 없습니다.</p>
        ) : (
          replies.map(reply => (
            <LetterListItem
              key={reply._id}
              letter={{
                _id: reply._id,
                title: reply.title,
                created_at: reply.replied_at,
                emotion: reply.emotion,
              }}
              onClick={() => navigate(`/received/responses/${reply._id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
