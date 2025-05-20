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
    return state.message;
  };

  return (
    <div className={styles.container}>
      <h2>답장이 전송되었어요</h2>
      <img src="/image/write/otter_send.webp" alt="letter" />

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

{/* {state.rewardItems.length > 0 ? (
          <div className={styles.rewardItems}>
            {state.rewardItems.map((item, index) => (
              <div key={index} className={styles.rewardItem}>
                <p>{item.name}</p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.pointMessage}>포인트가 지급되었습니다!</p>
        )}
      </div> */}


      <div className={styles.navButtonContainer}>
        <button onClick={() => navigate('/items')}>
          <img
            src="/image/common/item.webp"
            object-fit="cover"
            alt="storage"
            className={styles.navImage}
          />
          아이템
        </button>
        <button onClick={() => navigate('/')}>
          <img
            src="/image/common/main.webp"
            object-fit="cover"
            alt="storage"
            className={styles.navImage}
          />
          메인
        </button>
      </div>
    </div>
  );
}