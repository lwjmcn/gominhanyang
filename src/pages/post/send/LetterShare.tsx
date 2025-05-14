import Appbar from '@/components/Appbar';
import styles from './lettershare.module.css';
import { useNavigate } from 'react-router-dom';

export default function LetterSharePage() {
  const navigate = useNavigate();

  // 🔧 뒤로 가기 버튼 함수
  const goback = () => {
    navigate(-1);
  };

  const handleNextPage = (type: string) => {
    navigate('/letter/write', { state: { sendType: type } });
  };

  const handleSave = () => {
    console.log('Saved to my collection!');
    handleNextPage('save');
  };

  const handleRandom = () => {
    console.log('Sent to the sea!');
    handleNextPage('random');
  };

  const handleSend = () => {
    console.log('Sent to 온기우체부!');
    handleNextPage('send');
  };

  return (
    <>
      <Appbar title="" />

      <div className={styles.pageContainer}>
        <button onClick={goback} className={styles.backButton}>
          <img src="/icons/back.svg" alt="뒤로가기" />
        </button>

        <h2 className={styles.question}>누구에게 편지를 전하고 싶나요?</h2>

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
      </div>
    </>
  );
}
