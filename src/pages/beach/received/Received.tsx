import Appbar from '@/components/Appbar';
import styles from '../../post/postoffice.module.css';
import { useNavigate } from 'react-router-dom';
export default function ReceivedPage() {
  const navigate = useNavigate();

  return (
    <>
      <Appbar title="" />

      <div className={styles.container}>
        <div className={styles.speechBubble}>
          <div className={styles.bubbleText}>
            <h4>OO 님,{'\n'}어떤 이야기를 들어보실래요?</h4>
          </div>
        </div>
        <img src="https://placehold.co/600x600" alt="officer" />

        <div className="nav-button-container">
          <button onClick={() => navigate('/received/letters')}>
            <img src="https://placehold.co/50x50" alt="letter" />
            흘러온 편지
          </button>
          <button onClick={() => navigate('/received/responses')}>
            <img src="https://placehold.co/50x50" alt="storage" />
            받은 답장
          </button>
        </div>
      </div>
    </>
  );
}
