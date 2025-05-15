import Modal from '@/components/Modal';
import { useNavigate } from 'react-router-dom';
import styles from './CompleteWriteModal.module.css';

interface CompleteWriteModalProps {
  onClose: () => void;
}

export default function CompleteWriteModal({ onClose }: CompleteWriteModalProps) {
  const navigate = useNavigate();
  return (
    <Modal>
    <div className={styles.modalContainer}>
      <div className={styles.paperBox}>
        <div className={styles.header}>
          <img src="/icons/submit_bg.svg" alt="write icon" className={styles.icon} />
          <h2>편지를 마무리할 준비가 되셨나요?</h2>
        </div>

        <p className={styles.description}>아래 내용을 확인하고 편지 작성을 완료할 수 있어요.</p>

        <div className={styles.checkList}>
            전송 대상: 익명 사용자
            답장 내용: "첫시작부터~~...."
        </div>

        <div className={styles.warningBox}>
          <img src="/icons/submit_warning.svg" alt="warning" className={styles.inlineIcon} />
          개인정보나 욕설은 포함되지 않았나요? <br />
          편지를 전송하면 수정할 수 없어요.
        </div>

        <div className={styles.buttonRow}>
          <button className={styles.confirmButton} onClick={onClose}>
            <img src="/icons/submit_check.svg" alt="check" />
            다시 확인
          </button>
          <button
            className={styles.submitButton}
            onClick={() => {
              onClose();
              navigate('/letter/complete');
            }}
          >
            <img src="/icons/submit_complete.svg" alt="send" />
            작성 완료
          </button>
        </div>
      </div>
    </div>
  </Modal>
);
}
