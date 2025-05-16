import styles from './speechmodal.module.css';

interface SpeechModalProps {
  onClose?: () => void;
  onRefresh?: () => void;
  nickname?: string;
}
export default function SpeechModal({
  onClose,
  onRefresh,
  nickname = '닉네임',
}: SpeechModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* 말풍선 이미지 */}
        <img src="/icons/office/help_balloon.webp" alt="말풍선" className={styles.balloon}/>

        {/* 텍스트 & 버튼들이 올라가는 레이어 */}
        <div className={styles.inner}>
          {/* 닫기 버튼 */}
          <button className={styles.closeButton} onClick={onClose}>
            <img src="/icons/office/help_cancel.webp" alt="닫기" />
          </button>

          {/* 텍스트 */}
          <div className={styles.textBlock}>
            <p className={styles.line}>{nickname}아, 안녕?</p>
            <p className={styles.line}><strong>질문: 오늘 무엇이 제일 즐거웠어?</strong></p>
            <p className={styles.line}><em>첫시작한정: 너의 이야기를 들려줘!</em></p>
          </div>

          {/* 새로고침 버튼 */}
          <button className={styles.refreshButton} onClick={onRefresh}>
            <img src="/icons/office/help_refresh.webp" alt="새로고침" />
          </button>
        </div>
      </div>

      
    </div>
  );
}
