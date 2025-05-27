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
      <div className={styles.pointContainer}>
        <img
          src="/image/main/shell.webp"
          object-fit="cover"
          alt="shell"
          className={styles.shellImage}
        />
        <p className={styles.level}>Lv.{level}</p>
      </div>
      <p className={styles.point}>{pointFill} / 100 </p>
      <img
        className={styles.settingButton}
        onClick={() => navigate('/settings')}
        src="/image/main/setting.webp"
        object-fit="cover"
        alt="setting"
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
