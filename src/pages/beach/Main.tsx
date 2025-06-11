import { useState, useEffect } from 'react';
import styles from './main.module.css';
import { useNavigate } from 'react-router-dom';
import { usePointStore } from '@/store/point';
import { useToastStore } from '@/store/toast';

export default function MainPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const { level, point, isLoading, fetchPoint } = usePointStore();
  // const { items, setItems, getUsedItems } = useItemStore();

  const [otterClicked, setOtterClicked] = useState(false);

  useEffect(() => {
    if (level === 0 && !isLoading)
      fetchPoint().catch(error => {
        showToast(error.message || '포인트 정보를 불러오는데 실패했습니다.');
      });

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
