import Appbar from '@/components/Appbar';
import { useNavigate } from 'react-router-dom';
import styles from './postoffice.module.css';

export default function PostOfficePage() {
  const navigate = useNavigate();
  return (
    <>
      <Appbar title="" />

      <div className={styles.container}>
        <div className={styles.speechBubble}>
          <div className={styles.bubbleText}>
            <h4>우체국에 오신 것을 환영해요{'\n'}어떤 걸 하고 싶으신가요?</h4>
          </div>
        </div>
        <img src="https://placehold.co/600x600" alt="officer" />
        <div className="nav-button-container">
          <button onClick={() => navigate('/letter/share')}>
            <img src="https://placehold.co/50x50" alt="letter" />
            편지작성
          </button>
          <button onClick={() => navigate('/letters')}>
            <img src="https://placehold.co/50x50" alt="storage" />
            편지보관함
          </button>
        </div>
      </div>
    </>
  );
}
