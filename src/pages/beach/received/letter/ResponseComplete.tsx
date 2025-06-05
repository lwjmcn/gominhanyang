import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ActionType, RewardItem } from '@/lib/type/reward.type';
import styles from './responsecomplete.module.css';

interface LocationState {
  message: string;
  leveled_up: boolean;
  rewardItems: RewardItem[];
}

export default function ResponseCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  return (
    <div className={styles.container}>
      <p className={styles.title}>온기를 담은 소중한 답장,{'\n'}온기 우체부가 잘 전달해드릴게요!</p>
      <img className={styles.otterImage} src="/image/beach/ondal.webp" alt="우체부" />
      <div className={styles.rewardSection}>
        <p className={styles.text}>
          {
            /*state.rewardItems.length > 0
            ? '새로운 아이템이 도착했어요.\n어서 확인해보세요!'
            :*/ state.message
          }
        </p>
      </div>

      <div className={styles.navButtonContainer}>
        {/* {state.rewardItems.length > 0 && (
          <div onClick={() => navigate('/items')} className={styles.navButton}>
            <img src="/image/common/item.webp" className={styles.navIcon} alt="아이템보관함" />
            <div className={styles.yellowBoxButton}>
              <span className={styles.buttonLabel}>아이템 보관함 가기</span>
            </div>
          </div>
        )} */}
        <div onClick={() => navigate('/')} className={styles.navButton}>
          <img src="/image/common/main.webp" className={styles.navIcon} alt="메인화면" />
          <div className={styles.yellowBoxButton}>
            <span className={styles.buttonLabel}>메인화면 가기</span>
          </div>
        </div>
      </div>
    </div>
  );
}
