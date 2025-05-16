import { useNavigate } from 'react-router-dom';
import styles from './received.module.css';

interface ReceiveProps {
  readLetterText?: string;
  viewRepliesText?: string;
}

export default function Receive({ 
  readLetterText = '흘러온 편지 읽기',
  viewRepliesText = '내게 온 답장 보기'
}: ReceiveProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleReadLetter = () => {
    navigate('/read-letter');
  };

  const handleViewReplies = () => {
    navigate('/view-replies');
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.backButton}
        onClick={handleBack}
        aria-label="Go back"
      />
      
      <div className={styles.otterContainer}>
        <div className={styles.otter} />
      </div>

      <div className={styles.seaItemsContainer}>
        <div className={styles.paperBoat} />
        <div className={styles.bottle} />
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleReadLetter}>
          <div className={styles.buttonBackground} />
          <span className={styles.buttonText}>{readLetterText}</span>
        </button>

        <button className={styles.button} onClick={handleViewReplies}>
          <div className={styles.buttonBackground} />
          <span className={styles.buttonText}>{viewRepliesText}</span>
        </button>
      </div>
    </div>
  );
}
