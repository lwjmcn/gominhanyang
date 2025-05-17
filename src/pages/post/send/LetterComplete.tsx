import { useLocation, useNavigate } from 'react-router-dom';
import { RewardItem } from '@/lib/type/reward.type';
import styles from './lettercomplete.module.css';
import { SendType } from '@/lib/type/letter.type';

interface LocationState {
  sendType: SendType;
  message: string;
  leveled_up: boolean;
  rewardItems: RewardItem[];
}

export default function LetterCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const getRewardMessage = () => {
    return state.message;
  };

  return (
    <div className={styles.container}>
      <h2>편지가 저장되었어요</h2>
      <img
        src={`/image/post/otter_${state.sendType === SendType.SELF ? 'save' : 'send'}.webp`}
        object-fit="cover"
        alt="letter"
      />

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
        <button onClick={() => navigate('/letters')}>
          <img
            src="/image/common/paper_archive.webp"
            object-fit="cover"
            alt="letter"
            className={styles.navImage}
          />
          편지 보관함
        </button>

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
