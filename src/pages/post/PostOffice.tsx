import Appbar from '@/components/Appbar';
import { useNavigate } from 'react-router-dom';
import styles from './postoffice.module.css';

export default function PostOfficePage() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <Appbar title="" />
        <div className={styles.speechBubble}>
          <div className={styles.bubbleText}>
            <h4>우체국에 오신 것을 환영해요{'\n'}어떤 걸 하고 싶으신가요?</h4>
          </div>
        </div>
        <div className="nav-button-container">
          <button onClick={() => navigate('/letter/share')}>
            <img src="/image/post/pencil_letter.webp" alt="letter" />
            <h4 style={{ margin: '0px' }}>편지작성</h4>
          </button>
          <button onClick={() => navigate('/letters')}>
            <img src="/image/common/paper_archive.webp" alt="storage" />
            <h4 style={{ margin: '0px' }}>편지보관함</h4>
          </button>
        </div>
      </div>
    </>
  );
}
