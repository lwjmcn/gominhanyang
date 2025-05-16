import Appbar from '@/components/Appbar';
import styles from './lettershare.module.css';
import { useNavigate } from 'react-router-dom';

export default function LetterSharePage() {
  const navigate = useNavigate();

  const handleNextPage = (type: string) => {
    navigate('/letter/write', { state: { sendType: type } });
  };

  return (
    <>
      <div className={styles.bg}>
      
        <div className={styles.mainContainer}>
          
          <Appbar title="" showBackButton={true} />
          <h2 className={styles.question}>누구에게 편지를 전하고 싶나요?</h2>
          <div className={styles.gridContainer}>
            <button className={`${styles.shareButton} ${styles.archive}`} onClick={() => handleNextPage('save')}>
              <span className={styles.buttonText}>
                나만의 보관함에 <br /> 간직하기
              </span>
            </button>
            <button className={`${styles.shareButton} ${styles.sea}`} onClick={() => handleNextPage('random')}>
              <span className={styles.buttonText}>
                바다 위 익명 <br /> 친구에게 띄우기
              </span>
            </button>
            <button className={`${styles.shareButton} ${styles.ongi}`} onClick={() => handleNextPage('send')}>
              <span className={styles.buttonText}>
                온기 우체부에게 <br /> 전송하기
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
