import { useState, useEffect } from 'react';
import styles from './main.module.css';
import { useNavigate } from 'react-router-dom';
import { getMyReward } from '../../lib/api/reward';
import { isErrorResponse } from '../../lib/response_dto';

export default function MainPage() {
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
    <div className={styles.container}>
      <div onClick={() => navigate('/items')} className={styles.pointContainer}>
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

      <div className={styles.roadSignContainer}>
        <img
          className={styles.roadSignImage}
          src="/image/main/road_sign.webp"
          alt="sign-to-post"
          object-fit="cover"
        />
        <button onClick={() => navigate('/post')} className={styles.signHouseText}>
          집 가는 길
        </button>
      </div>
      <div className={styles.roadSignContainer}>
        <img
          className={styles.roadSignImage}
          src="/image/main/road_sign.webp"
          alt="sign-to-ocean"
          object-fit="cover"
        />
        <button onClick={() => navigate('/received')} className={styles.signOceanText}>
          해변 가는 길
        </button>
      </div>

      <div className={styles.otterContainer}>
        <div className={styles.speechBubble}>
          안녕, 반가워! 우리
          <br />
          오늘은 어디로 떠나볼까?
        </div>
        <img src="/image/main/otter.webp" className={styles.otterImage} alt="otter" />
        <div className={styles.otterShadow} />
      </div>
    </div>
  );
}
