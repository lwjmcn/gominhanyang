import Appbar from '@/components/Appbar';
import styles from '../../post/received.module.css';
import { useNavigate } from 'react-router-dom';

export default function ReceivedPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Appbar title="" />

      <div className={styles.optionRow}>
        <div className={styles.optionItem} onClick={() => navigate('/received/letters')}>
          <img className={styles.icon} src="/image/common/paper_boat.webp" alt="흘러온 편지" />
          <div className={styles.labelBox}>
            <span className={styles.labelText}>흘러온 편지 읽기</span>
          </div>
        </div>

        <div className={styles.optionItem} onClick={() => navigate('/received/responses')}>
          <img className={styles.icon} src="/image/beach/bottle.webp" alt="받은 답장" />
          <div className={styles.labelBox}>
            <span className={styles.labelText}>내게 온 답장 보기</span>
          </div>
        </div>
      </div>
    </div>
  );
}
