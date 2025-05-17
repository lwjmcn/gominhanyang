import { useState, useEffect } from 'react';
import styles from './beach.module.css';
import { useNavigate } from 'react-router-dom';
import { getMyReward } from '../../lib/api/reward';
import { isSuccessResponse } from '../../lib/response_dto';

export default function BeachPage() {
  const navigate = useNavigate();
  const [pointFill, setPointFill] = useState(0);

  useEffect(() => {
    const getMyPoints = async () => {
      const response = await getMyReward();
      if (isSuccessResponse(response)) {
        const percentage = (response.point / 100) * 100;
        setPointFill(percentage);
      }
    };

    getMyPoints();
  }, []);

  return (
    <div>
      <div className={styles.pointContainer}>
        <img src="https://placehold.co/100x100" alt="shell" />
        <div className={styles.cylinder}>
          <div
            className={styles.cylinderFill}
            style={{ '--fill-level': `${pointFill}%` } as React.CSSProperties}
          />
        </div>
      </div>
      <div className={styles.settingButton} onClick={() => navigate('/settings')}>
        <img src="https://placehold.co/100x100" alt="setting" />
      </div>

      <img className={styles.postImage} src="https://placehold.co/400x400" alt="post-office" />

      <div className={styles.navContainer}>
        <button onClick={() => navigate('/post')}>내 편지 열람 & 편지 작성</button>
        <button onClick={() => navigate('/received')}>누군가의 이야기 & 답장 본내기</button>
        <button onClick={() => navigate('/items')}>아이템 보관함</button>
      </div>
    </div>
  );
}
