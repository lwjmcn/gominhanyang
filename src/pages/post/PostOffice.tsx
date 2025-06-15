import Appbar from '@/components/Appbar';
import { useNavigate } from 'react-router-dom';
import styles from './postoffice.module.css';
import { useState } from 'react';

export default function PostOfficePage() {
  const navigate = useNavigate();
  const [otterClicked, setOtterClicked] = useState(false);

  return (
    <div
      className={styles.container}
      onClick={() => {
        setOtterClicked(true);
        setTimeout(() => setOtterClicked(false), 2000);
      }}
    >
      <Appbar title="" />
      <div className={`${styles.speechBubble} ${otterClicked ? styles.bubbleAnimation : ''}`}>
        <p>편지를 쓰러 갈까요?{'\n'}당신의 이야기를 들려주세요.</p>
      </div>
      <div className={styles.optionRow}>
        <button className={styles.optionItem} onClick={() => navigate('/letter/share')}>
          <img
            src="/image/post/pencil_letter.webp"
            alt="letter"
            className={styles.icon}
            style={{ transform: 'translateX(2rem)' }}
          />
          <div className={styles.labelBox}>
            <p className={styles.labelText}>편지{'\n'} 쓰러 가기</p>
          </div>
        </button>

        <button className={styles.optionItem} onClick={() => navigate('/letters')}>
          <img src="/image/common/paper_archive.webp" alt="storage" className={styles.icon} />
          <div className={styles.labelBox}>
            <p className={styles.labelText}>나의 편지{'\n'} 보관함 가기</p>
          </div>
        </button>
      </div>
    </div>
  );
}
