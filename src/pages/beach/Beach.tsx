import { useState } from 'react';
import styles from './beach.module.css';
import { useNavigate } from 'react-router-dom';

export default function BeachPage() {
  const navigate = useNavigate();
  const [pointFill, setPointFill] = useState(60);

  return (
    <div className={styles.container}>
      {/* 배경 이미지 */}
      <img src="/icons/main/main_firststart.webp" alt="배경" className={styles.background} />

      {/* 포인트 바 */}
      <div className={styles.pointContainer}>
        <img src="/icons/main/main_shellreward.webp" alt="shell" />
        <div className={styles.cylinder}>
          <div
            className={styles.cylinderFill}
            style={{ '--fill-level': `${pointFill}%` } as React.CSSProperties}
          />
        </div>
      </div>

      {/* 설정 버튼 */}
      <div className={styles.settingButton} onClick={() => navigate('/settings')}>
        <img src="/icons/main/main_settings.webp" alt="setting" />
      </div>
      <div className={styles.centerText}>
  <p>마음의 항해에 온 걸 환영해요.<br />오늘의 기분을 들려줄래요?</p>
</div>


      {/* 네비게이션 버튼 */}
      <div className={styles.navContainer}>
      <img src="/icons/main/main_postoffice.webp" alt="우체국" onClick={() => navigate('/items')} />
        <img src="/icons/main/main_gotosea.webp" alt="바다로" onClick={() => navigate('/post')} />
        <img src="/icons/main/main_archive.webp" alt="보관함" onClick={() => navigate('/received')} />
      </div>
    </div>
  );
}