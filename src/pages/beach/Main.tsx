import { useState, useEffect } from 'react';
import styles from './main.module.css';
import { useNavigate } from 'react-router-dom';
import { usePointStore } from '@/store/point';
import { useToastStore } from '@/store/toast';
import { useItemStore } from '@/store/item';
import { ITEM_IMAGE_URL, ITEM_POSITIONS } from '@/lib/constants/items';

export default function MainPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const { level, point, isLoading: isPointLoading, fetchPoint } = usePointStore();
  const { items, isLoading: isItemsLoading, fetchItems } = useItemStore();

  const [otterClicked, setOtterClicked] = useState(false);
  const otterTexts = [
    '반가워요!\n오늘은 어디로 떠나볼까요?',
    '편지를 쓰고 싶다면\n집으로 가보세요!',
    '해변에 가면\n편지를 받아볼 수 있어요!',
    '조개를 클릭하면\n아이템들을 확인할 수 있어요!',
  ];
  const [otterIndex, setOtterIndex] = useState(() => Math.floor(Math.random() * otterTexts.length));

  useEffect(() => {
    if (level === 0 && !isPointLoading)
      fetchPoint().catch(error => {
        showToast(error.message || '포인트 정보를 불러오는데 실패했습니다.');
      });

    if (items.length === 0 && !isItemsLoading) {
      fetchItems().catch(error => {
        showToast(error.message || '아이템 정보를 불러오는데 실패했습니다.');
      });
    }

    const interval = setInterval(() => {
      setOtterIndex(i => (i + 1) % otterTexts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const usedItems = items.filter(item => item.used);

  // const allItems: Item[] = [
  //   { item_id: 'i1', name: '푸른 나무', used: true, category: CategoryType.BEACH },
  //   { item_id: 'id2', name: '빨간 들꽃', used: true, category: CategoryType.BEACH },
  //   { item_id: 'id3', name: '노란 나비', used: true, category: CategoryType.BEACH },
  //   { item_id: 'id4', name: '돌고래', used: true, category: CategoryType.OCEAN },
  //   { item_id: 'id5', name: '해파리', used: true, category: CategoryType.OCEAN },
  // ];

  return (
    <div className={styles.container}>
      {usedItems.map(item => {
        const position = ITEM_POSITIONS[item.name] || {
          left: '50%',
          top: '50%',
          width: '8rem',
          height: '8rem',
        };

        return (
          <img
            key={item.item_id}
            src={ITEM_IMAGE_URL[item.name]}
            alt={item.name}
            className={styles.itemImage}
            style={{
              position: 'absolute',
              ...position,
              objectFit: 'contain',
            }}
          />
        );
      })}

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
          setOtterIndex(prev => (prev + 1) % otterTexts.length);
        }}
      >
        <div className={`${styles.speechBubble} ${otterClicked ? styles.bubbleAnimation : ''}`}>
          <p className={styles.speechText} key={otterIndex}>
            {otterTexts[otterIndex] || '안녕하세요!'}
          </p>
        </div>
        <img src="/image/main/otter.webp" className={styles.otterImage} alt="otter" />
        <div className={styles.otterShadow} />
      </div>
    </div>
  );
}
