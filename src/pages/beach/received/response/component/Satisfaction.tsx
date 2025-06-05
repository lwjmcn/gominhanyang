import { useState } from 'react';
import styles from './satisfaction.module.css';
import { sendSatisfaction } from '@/lib/api/satisfaction';
import { useToastStore } from '@/store/toast';

interface SatisfactionProps {
  letterId: string; // 편지 ID를 prop으로 받도록 변경
}
export const Satisfaction = ({ letterId }: SatisfactionProps) => {
  const [stars, setStars] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const { showToast } = useToastStore();

  const handleSubmit = async () => {
    if (stars === 0) {
      alert('별점을 선택해주세요.');
      return;
    }
    if (comment.trim() === '') {
      alert('코멘트를 입력해주세요.');
      return;
    }

    await sendSatisfaction({
      letter_id: letterId,
      rating: stars,
      reason: comment,
    });
    showToast('만족도 조사가 완료되었어요. 감사합니다! 😊');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.description}>
          답장에 대한 짧은 피드백을 들려주세요!{'\n'}여러분의 한마디가 더 나은 편지 "마음의 항해"를
          만듭니다💌
        </p>
        <img
          src="/image/common/double_down_arrow.svg"
          alt="Double Down Arrow"
          className={styles.arrow}
        />
      </div>
      <div className={styles.content}>
        <div>
          <h3 className={styles.title}>답장이 마음에 드셨나요?</h3>
          {/* 1~5점 별 클릭 */}
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map(star => (
              <button key={star} className={styles.starButton} onClick={() => setStars(star)}>
                <span className={stars >= star ? styles.filledStar : styles.emptyStar}>★</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.commentContainer}>
          <h2 className={styles.title}>위와 같이 느끼신 이유를 자유롭게 적어주세요</h2>
          <textarea
            className={styles.commentInput}
            value={comment}
            placeholder="어떤 점이 좋았는지, 혹은 아쉬웠는지 알려주시면 큰 도움이 됩니다 😊"
            maxLength={100}
            onChange={e => setComment(e.target.value)}
          />
        </div>

        <button className={styles.submitButton} onClick={handleSubmit}>
          제출
        </button>
      </div>
    </div>
  );
};
