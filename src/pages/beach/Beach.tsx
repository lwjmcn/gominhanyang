import { useState, useEffect } from 'react';
import styles from './beach.module.css';
import { useNavigate } from 'react-router-dom';
import { getMyReward } from '../../lib/api/reward';
import { isErrorResponse, isSuccessResponse } from '../../lib/response_dto';

export default function BeachPage() {
  const navigate = useNavigate();
  const [pointFill, setPointFill] = useState(0);
  const [level, setLevel] = useState(0);

  const getMyPoints = async () => {
    const response = await getMyReward();
    if (isErrorResponse(response)) {
      console.error('Error fetching points:', response);
      return;
    }

    const percentage = (response.point / 100) * 100;
    setPointFill(percentage);
    setLevel(response.level);
    console.log('level', response.level);
  };
  useEffect(() => {
    getMyPoints();
  }, []);

  return (
    <div>
      <div className={styles.pointContainer}>
        <img
          src="/image/main/shell.webp"
          object-fit="cover"
          alt="shell"
          className={styles.shellImage}
        />
        <p className={styles.level}>Lv.{level}</p>
        <div className={styles.cylinder}>
          <div
            className={styles.cylinderFill}
            style={{ '--fill-level': `${pointFill}%` } as React.CSSProperties}
          />
        </div>
      </div>
      <img
        className={styles.settingButton}
        onClick={() => navigate('/settings')}
        src="/image/main/setting.webp"
        object-fit="cover"
        alt="setting"
      />

      <img
        className={styles.postImage}
        // src="/image/main/background_initial.webp"
        src="https://placehold.co/300x300"
        object-fit="fill"
        alt="post-office"
      />

      <div className={styles.navContainer}>
        <img
          onClick={() => navigate('/post')}
          src="/image/main/post.webp"
          alt="letter"
          object-fit="cover"
        />
        <img
          onClick={() => navigate('/received')}
          src="/image/main/ocean.webp"
          alt="letter"
          object-fit="cover"
        />
        <img
          onClick={() => navigate('/items')}
          src="/image/main/archive.webp"
          alt="letter"
          object-fit="cover"
        />
      </div>
    </div>
  );
}
