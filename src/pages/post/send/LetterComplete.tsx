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
      <p className={styles.title}>
        언제든 다시 보고 싶은 편지, <br />
        보관함에 소중히 넣어두었어요.
      </p>

      <img
        className={styles.otterImage}
        src={`/image/post/otter_${state.sendType === SendType.SELF ? 'save' : 'send'}.webp`}
        object-fit="cover"
        alt="letter"
      />

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
        {/* {state.rewardItems.length > 0 ? (
          <div onClick={() => navigate('/items')} className={styles.navButton}>
            <img src="/image/common/item.webp" className={styles.navIcon} alt="아이템" />
            <div className={styles.yellowBoxButton}>
              <span className={styles.buttonLabel}>아이템 보관함</span>
            </div>
          </div>
        ) : ( */}
        <div onClick={() => navigate('/letters')} className={styles.navButton}>
          <img src="/image/common/paper_archive.webp" className={styles.navIcon} alt="보관함" />
          <div className={styles.yellowBoxButton}>
            <span className={styles.buttonLabel}>나의 편지 보관함</span>
          </div>
        </div>
        {/* )} */}

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
