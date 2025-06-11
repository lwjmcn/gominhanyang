import styles from './level.module.css';
import { usePointStore } from '@/store/point';

export default function Level() {
  const { level, point } = usePointStore();

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
