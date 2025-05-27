import Appbar from '@/components/Appbar';
import styles from './beach.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRandomLetters, getRepliedLetters } from '@/lib/api/letter';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import { Letter, RepliedLetter } from '@/lib/type/letter.type';

export default function BeachPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [letters, setLetters] = useState<Letter[]>([]);
  const [responses, setResponses] = useState<RepliedLetter[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 편지 불러오기
        const lettersRes = await getRandomLetters();
        if (!lettersRes || isErrorResponse(lettersRes)) {
          showToast('편지를 불러오는 중 오류가 발생했습니다.');
        } else {
          setLetters(lettersRes.unread_letters);
        }

        // 답장 불러오기
        const responsesRes = await getRepliedLetters();
        if (!responsesRes || isErrorResponse(responsesRes)) {
          showToast('답장을 불러오는 중 오류가 발생했습니다.');
        } else {
          setResponses(responsesRes['replied-to-me']);
        }
      } catch (error) {
        showToast('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.pageBackground}>
      <Appbar title="" />

      <div className={styles.container}>
        <div className={styles.optionItem} onClick={() => navigate('/received/inbox-test')}>
          <img className={styles.icon1} src="/image/beach/ListIcon.webp" alt="받은 답장" />
        </div>
        {/* 편지들 */}
        {letters.slice(0, 2).map((letter, index) => (
          <div
            key={`letter-${letter._id}`}
            className={styles[`letter${index}`]}
            onClick={() => navigate(`/received/letters/${letter._id}`)}
          >
            <img
              className={styles.icon2}
              src="/image/beach/paperboat.webp"
              alt={`흘러온 편지 ${index + 1}`}
            />
          </div>
        ))}

        <div
          className={styles.response0}
          onClick={() => {
            if (responses.length > 0) {
              navigate(`/received/responses/${responses[0]._id}`);
            } else {
              showToast('아직 받은 답장이 없습니다.');
            }
          }}
        >
          <img
            className={styles.icon3}
            src="/image/beach/responsebottle.webp"
            alt="받은 답장"
            style={{
              cursor: responses.length > 0 ? 'pointer' : 'default',
            }}
          />
        </div>

        <img
          className={styles.charac}
          src="/image/beach/BeachOndal.webp"
          alt=""
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
