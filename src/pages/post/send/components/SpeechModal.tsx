import styles from './speechmodal.module.css';

interface SpeechModalProps {
  onClose?: () => void;
}

export default function SpeechModal({ onClose }: SpeechModalProps) {
  const handleRefresh = () => {};

  const nickname = '친구'; // Replace with actual nickname logic

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖️
        </button>
        <p>
          {nickname}아, 안녕?{'\n'}오늘 무엇이 제일 즐거웠어?{'\n'}너의 이야기를 들려줘!
        </p>
        <button className={styles.closeButton} onClick={handleRefresh}>
          🔃
        </button>
      </div>
    </div>
  );
}
