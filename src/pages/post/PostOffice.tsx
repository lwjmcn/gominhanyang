import Appbar from '@/components/Appbar';
import { useNavigate } from 'react-router-dom';
import styles from './postoffice.module.css';

export default function PostOfficePage() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <Appbar title="" />
      <div className={styles.speechBubble}>
        편지를 쓰러 가볼까?
        <br />
        너의 이야기를 들려줘!
      </div>
      <div className={styles.optionRow}>
        <div className={styles.optionItem} onClick={() => navigate('/letter/share')}>
          <img src="/image/post/pencil_letter.webp" alt="letter" className={styles.icon} />
          <div className={styles.labelBox}>
            <span className={styles.labelText}>
              편지 <br />
              쓰러 가기
            </span>
          </div>
        </div>

        <div className={styles.optionItem} onClick={() => navigate('/letters')}>
          <img src="/image/common/paper_archive.webp" alt="storage" className={styles.icon} />
          <div className={styles.labelBox}>
            <span className={styles.labelText}>
              나의 편지 <br />
              보관함 가기
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
