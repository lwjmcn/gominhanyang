import Appbar from '@/components/Appbar';
import styles from './beach.module.css';
import { useNavigate } from 'react-router-dom';

export default function BeachPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.pageBackground}>
      <Appbar title="" />

      <div className={styles.container}>
        <div className={styles.optionItem} onClick={() => navigate('/received/letters')}>
          <img className={styles.icon1} src="/image/beach/boat.webp" alt="흘러온 편지" />
          <div className={styles.labelBox1}>
            <span className={styles.labelText1}>흘러온 편지 읽기</span>
          </div>
        </div>

        <div className={styles.optionItem} onClick={() => navigate('/received/responses')}>
          <img className={styles.icon2} src="/image/beach/jar.webp" alt="받은 답장" />
          <div className={styles.labelBox}>
            <span className={styles.labelText}>내게 온 답장 보기</span>
          </div>
        </div>
      </div>
    </div>
  );
}
