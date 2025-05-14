import Appbar from '@/components/Appbar';
import styles from './lettershare.module.css';
import { useNavigate } from 'react-router-dom';

export default function LetterSharePage() {
  const navigate = useNavigate();
  const handleNextPage = (type: string) => {
    navigate('/letter/write', { state: { sendType: type } });
  };

  const handleSave = () => {
    // handle save logic here

    console.log('Saved to my collection!');
    handleNextPage('save');
  };

  const handleRandom = () => {
    // handle random logic here

    console.log('Sent to the sea!');
    handleNextPage('random');
  };

  const handleSend = () => {
    // handle send logic here

    console.log('Sent to 온기우체부!');
    handleNextPage('send');
  };
  return (
    <>
      <Appbar title="" />
      <div className={styles.gridContainer}>
  <button className={`${styles.shareButton} ${styles.archive}`} onClick={handleSave}>
    <span className={styles.buttonText}>나만의 보관함에 간직하기</span>
  </button>
  <button className={`${styles.shareButton} ${styles.sea}`} onClick={handleRandom}>
    <span className={styles.buttonText}>바다 위 익명 친구에게 띄우기</span>
  </button>
  <button className={`${styles.shareButton} ${styles.ongi}`} onClick={handleSend}>
    <span className={styles.buttonText}>온기 우체부에게 전송하기</span>
  </button>
</div>

    </>
  );
}