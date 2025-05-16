import Modal from '@/components/Modal';
import styles from './CompleteWriteModal.module.css';

interface CompleteWriteModalProps {
  onClose: () => void;
  onNext: () => void;
}

export default function CompleteWriteModal({ onClose, onNext }: CompleteWriteModalProps) {
  return (
    <Modal>
    <div className={styles.modalContainer}>
      <div className={styles.paperBox}>
        <div className={styles.header}>
          <h2>📝 편지를 마무리할<br/> 준비가 되셨나요?</h2>
        </div>

        <p className={styles.description}>아래 내용을 확인하고 편지 작성을 완료할 수 있어요.</p>

        <div className={styles.checkList}>
            <div>📤전송 대상: 익명 사용자 </div>
            <div>🧾답장 내용: "&nbsp첫시작부터~~....&nbsp"</div>
            <div style={{paddingTop: '10px'}}></div>
        </div>

        <div className={styles.warningBox}>
          <img src="/icons/office/submit_warning.webp" alt="warning" className={styles.inlineIcon} />
          <span>개인정보나 욕설은 포함되지 않았나요? <br />
          편지를 전송하면 수정할 수 없어요.</span>
        </div>
        <div style={{paddingTop: '10px'}}></div>
        <div className={styles.buttonRow}>
          <button className={styles.confirmButton} onClick={onClose}>
            <img src="/icons/office/submit_check.webp" alt="check" />
            <span>다시 확인</span>
          </button>
          <button
            className={styles.submitButton}
            onClick={onNext}
          >
            <img src="/icons/office/submit_complete.webp" alt="send" />
            <span>작성 완료</span>
          </button>
        </div>
      </div>
    </div>
  </Modal>
);
}
