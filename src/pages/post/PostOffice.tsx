import Appbar from '@/components/Appbar';
import { useNavigate } from 'react-router-dom';
import styles from './postoffice.module.css';

export default function PostOfficePage() {
  const navigate = useNavigate();

  return (
    <>
      <Appbar title="" />
      <div className={styles.container}>
      <div className={styles.container}>
  <div className={styles.navButtonContainer}>
    <button className={styles.navButton} onClick={() => navigate('/letter/share')}>
      <img src="/icons/office/office_gotowrite.webp" alt="편지 쓰러 가기" />
      <span>편지 쓰러 가기</span>
    </button>
    <button className={styles.navButton} onClick={() => navigate('/letters')}>
      <img src="/icons/office/office_gotoarchive.webp" alt="보관함 가기" />
      <span>나의 편지 보관함 가기</span>
    </button>
  </div>
</div>
</div>
    </>
  );
}
