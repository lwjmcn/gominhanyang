import { useState, useEffect } from 'react';
import Appbar from '@/components/Appbar';
import LetterListItem from '@/components/LetterListItem';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '@/store/toast';
import { useLetterStore } from '@/store/letter';
import styles from '../letter/receivedlistall.module.css';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Nothing } from '@/components/Nothing';

export default function ReceivedListAllPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [tab, setTab] = useState<'letter' | 'reply'>('letter');
  const {
    receivedLetters,
    receivedReplies,
    isReceivedLettersLoading,
    isReceivedRepliesLoading,
    fetchReceivedLetters,
    fetchReceivedReplies,
  } = useLetterStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tab === 'letter') await fetchReceivedLetters();
        else await fetchReceivedReplies();
      } catch (error) {
        showToast(
          error instanceof Error ? error.message : '데이터를 불러오는 중 오류가 발생했습니다.',
        );
      }
    };

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
        {(tab === 'letter' ? isReceivedLettersLoading : isReceivedRepliesLoading) ? (
          <LoadingSpinner
            description={tab === 'letter' ? '편지를 불러오는 중...' : '답장을 불러오는 중...'}
          />
        ) : tab === 'letter' ? (
          receivedLetters.length === 0 ? (
            <Nothing description="앗, 아직 받은 편지가 없어요." />
          ) : (
            receivedLetters.map(letter => (
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
        ) : receivedReplies.length === 0 ? (
          <Nothing description="앗, 아직 받은 답장이 없어요." />
        ) : (
          receivedReplies.map(reply => (
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
