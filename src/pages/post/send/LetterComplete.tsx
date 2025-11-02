import { useLocation, useNavigate } from 'react-router-dom';
import { RewardItem } from '@/lib/type/reward.type';
import styles from './lettercomplete.module.css';
import { SendType } from '@/lib/type/letter.type';
import { useEffect, useState } from 'react';
import { useLetterStore } from '@/store/letter';
import { Satisfaction } from '@/pages/beach/received/response/component/Satisfaction';
import Modal from '@/components/Modal';

interface LocationState {
  sendType: SendType;
  message: string;
  leveled_up: boolean;
  rewardItems: RewardItem[];
  letterId?: string;
}

export default function LetterCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const [showSatisfactionModal, setShowSatisfactionModal] = useState<boolean>(
    () => !!state?.letterId,
  );

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

      {/* <div className={styles.rewardSection}>
        <p className={styles.text}>
          {state.rewardItems.length > 0
            ? '새로운 아이템이 도착했어요.\n어서 확인해보세요!'
            : state.message}
        </p>
      </div> */}

      {/* Satisfaction survey for the sent letter, shown as a modal when letterId was provided */}
      {state?.letterId && showSatisfactionModal && (
        <Modal onClose={() => setShowSatisfactionModal(false)}>
          <Satisfaction letterId={state.letterId} />
        </Modal>
      )}

      <div className={styles.navButtonContainer}>
        {/* {state.rewardItems.length > 0 ? (
          <button onClick={() => navigate('/items')} className={styles.navButton}>
            <img src="/image/common/item.webp" className={styles.navIcon} alt="아이템" />
            <div className={styles.yellowBoxButton}>
              <p className={styles.buttonLabel}>아이템 보관함</p>
            </div>
          </button>
        ) : ( */}
        <button onClick={() => navigate('/letters')} className={styles.navButton}>
          <img src="/image/common/paper_archive.webp" className={styles.navIcon} alt="보관함" />
          <div className={styles.yellowBoxButton}>
            <p className={styles.buttonLabel}>편지 보관함</p>
          </div>
        </button>
        {/* )} */}

        <button onClick={() => navigate('/')} className={styles.navButton}>
          <img src="/image/common/main.webp" className={styles.navIcon} alt="메인화면" />
          <div className={styles.yellowBoxButton}>
            <p className={styles.buttonLabel}>메인화면</p>
          </div>
        </button>
      </div>
    </div>
  );
}
