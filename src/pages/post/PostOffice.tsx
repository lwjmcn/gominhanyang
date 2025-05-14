import Appbar from '@/components/Appbar';
import { useNavigate } from 'react-router-dom';
import styles from './postoffice.module.css';

export default function PostOfficePage() {
  const navigate = useNavigate();

  
  return (
    <>
      <Appbar title="" />

      <div className={styles.container}>

{/* 배경화면 - background-image로 이미 CSS에서 처리 */}

        {/* 버튼들 */}
        <div className="nav-button-container">
          <button onClick={() => navigate('/letter/share')}>
            <img src="/icons/office/office_gotowrite.webp" alt="letter" />
            편지작성
          </button>
          <button onClick={() => navigate('/letters')}>
            <img src="/icons/office/office_gotoarchive.svg" alt="storage" />
            편지보관함
          </button>
        </div>
      </div>
    </>
  );
}
