import Appbar from '@/components/Appbar';
import { useNavigate } from 'react-router-dom';
import styles from './postoffice.module.css';

export default function PostOfficePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.bg}>
        <Appbar title=""/>  
        <div className={styles.content}>
          <div className={styles.navButtonContainer}>
            <button className={styles.navButton} onClick={() => navigate('/letter/share')}>
              <img src="/icons/office/office_gotowrite.webp" alt="편지 쓰러 가기" />
              <span>
                <img className={styles.office_textbg1} src="/icons/office/office_textbg.webp" alt="편지 쓰러 가기" />
                <div>편지 쓰러 가기</div>
              </span>
            </button>
            <button className={styles.navButton} onClick={() => navigate('/letters')}>
              <img src="/icons/office/office_gotoarchive.webp" alt="보관함 가기" />
              <span>
                <img className={styles.office_textbg2} src="/icons/office/office_textbg.webp" alt="보관함 가기" />
                <div>나의 편지<br />보관함 가기</div>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
