import styles from './level.module.css';
import { usePointStore } from '@/store/point';
import { useToastStore } from '@/store/toast';
import { useEffect } from 'react';

export default function Level() {
  const { level, point, isLoading, fetchPoint } = usePointStore();
  const { showToast } = useToastStore();

  useEffect(() => {
    if (level === 0 && !isLoading)
      fetchPoint().catch(error => {
        showToast(error.message || '회원 정보 조회 중 오류가 발생했습니다.');
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <img src="/image/common/item.webp" alt="item" className={styles.avatar} />
        <div>
          <p className={styles.text}>레벨 {level}</p>
          <p className={styles.description}>다음 레벨까지 {100 - point}점 남았어요.</p>
        </div>
      </div>
      <div className={styles.cylinder}>
        <div
          className={styles.cylinderFill}
          style={{ '--fill-level': `${point}%` } as React.CSSProperties}
        >
          <p className={styles.description}>{point}</p>
          <p className={styles.description}>/100</p>
        </div>
        <div className={styles.nextLevel}>{level + 1}</div>
      </div>
    </div>
  );
}
