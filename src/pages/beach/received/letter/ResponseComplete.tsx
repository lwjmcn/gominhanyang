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

  const getRewardMessage = () => {
    state.message = '5 포인트가 적립되었습니다.';
    return state.message;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.text2}>온기를 담은 소중한 답장,</h2>
      <h2 className={styles.text2}>온기 우체부가 잘 전달해드릴게요!</h2>

      <img className={styles.icon_ondal} src="/image/beach/ondal.webp"></img>
      <div className={styles.rewardSection}>
        <p className={styles.text}>{getRewardMessage()}</p>
        <div className={styles.rewardItems}>
          {state.rewardItems.map((item, index) => (
            <div key={index} className={styles.rewardItem}>
              <p className={styles.text}>{item.name}</p>
              <p className={styles.text}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.navButtonContainer}>
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
