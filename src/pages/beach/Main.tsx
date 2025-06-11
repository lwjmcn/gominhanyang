import { useState, useEffect } from 'react';
import styles from './main.module.css';
import { useNavigate } from 'react-router-dom';
import { getMyReward } from '../../lib/api/reward';
import { isErrorResponse } from '../../lib/response_dto';
// import { getMyItems } from '@/lib/api/item';
import { usePointStore } from '@/store/point';
// import { useItemStore } from '@/store/item';

export default function MainPage() {
  const navigate = useNavigate();
  const { level, point, setLevel, setPoint } = usePointStore();
  // const { items, setItems, getUsedItems } = useItemStore();

  const [otterClicked, setOtterClicked] = useState(false);

  const getMyPoints = async () => {
    const response = await getMyReward();
    if (isErrorResponse(response)) {
      console.error('Error fetching points:', response);
      return;
    }

    const percentage = (response.point / 100) * 100;
    setLevel(response.level);
    setPoint(response.point);
  };

  // const fetchUsedItems = async () => {
  //   try {
  //     const response = await getMyItems();
  //     if (!response || isErrorResponse(response)) {
  //       console.error('Error fetching items:', response);
  //       return;
  //     }
  //     setItems(response.items);
  //   } catch (error) {
  //     console.error('Error fetching items:', error);
  //   }
  // };

  useEffect(() => {
    // 스토어에 데이터가 없을 때만 API 호출
    if (level === 0) {
      getMyPoints();
    }

    // if (items.length === 0) {
    //   fetchUsedItems();
    // }
  }, []);

  return (
    <div className={styles.container}>
      {/* {getUsedItems().map(item => (
        <img
          key={item.item_id}
          src="/image/item/dolphin.webp"
          alt={item.name}
          className={styles.itemImage}
          style={{
            position: 'absolute',
            left: `${70}%`,
            top: `${30}%`,
            width: '8rem',
            height: '8rem',
            objectFit: 'contain',
          }}
        />
      ))} */}
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
            style={{ '--fill-level': `${point}%` } as React.CSSProperties}
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
        <button onClick={() => navigate('/beach')} className={styles.signOceanText}>
          해변 가는 길
        </button>
      </div>

      <div
        className={styles.otterContainer}
        onClick={() => {
          setOtterClicked(true);
          setTimeout(() => setOtterClicked(false), 2000);
        }}
      >
        <div className={`${styles.speechBubble} ${otterClicked ? styles.bubbleAnimation : ''}`}>
          <p>반가워요!{'\n'}오늘은 어디로 떠나볼까요?</p>
        </div>
        <img src="/image/main/otter.webp" className={styles.otterImage} alt="otter" />
        <div className={styles.otterShadow} />
      </div>
    </div>
  );
}
