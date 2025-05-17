import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ActionType, RewardItem } from '@/lib/type/reward.type';
import styles from './responsecomplete.module.css';

interface LocationState {
  letterId: string;
  rewardItems: RewardItem[];
  rewardAction: ActionType;
}

export default function ResponseCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const getRewardMessage = () => {
    if (state.rewardAction === ActionType.WRITE_LONG) {
      return '긴 답장 작성 보너스 보상이 지급되었어요!';
    }
    return '답장 작성 보상이 지급되었어요!';
  };

  return (
    <div className={styles.container}>
      <h2>답장이 전송되었어요</h2>
      <img src="https://placehold.co/400x200" alt="letter" />

      <div className={styles.rewardSection}>
        <h3>{getRewardMessage()}</h3>
        <div className={styles.rewardItems}>
          {state.rewardItems.map((item, index) => (
            <div key={index} className={styles.rewardItem}>
              <p>{item.name}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.navButtonContainer}>
        <button onClick={() => navigate('/received')}>
          <img src="https://placehold.co/50x50" alt="letter" />
          받은 편지함
        </button>
        <button onClick={() => navigate('/items')}>
          <img src="https://placehold.co/50x50" alt="storage" />
          아이템
        </button>
        <button onClick={() => navigate('/')}>
          <img src="https://placehold.co/50x50" alt="storage" />
          메인
        </button>
      </div>
    </div>
  );
}
