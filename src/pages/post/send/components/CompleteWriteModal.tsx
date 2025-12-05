import Modal from '@/components/Modal';
import Caution from './Caution';
import { SendType } from '@/lib/type/letter.type';
import styles from './completewritemodal.module.css';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface CompleteWriteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  type: 'letter' | 'reply';
  isLoading: boolean;
  content: string;
  sendType: SendType;
}

export default function CompleteWriteModal({
  onClose,
  onConfirm,
  type,
  isLoading,
  content,
  sendType,
}: CompleteWriteModalProps) {
  const modalType = type === 'letter' ? '편지' : '답장';

  return (
    <Modal onClose={onClose}>
      <div>
        <h2>{modalType}를 마무리 하시겠어요?</h2>
        <p>아래 내용을 확인하시면 {modalType} 작성을 완료할 수 있어요.</p>
        <div className={styles.contentContainer}>
          <p>
            📤 전송 대상:{' '}
            {sendType === SendType.SELF
              ? '없음'
              : sendType === SendType.RANDOM
                ? '익명 친구'
                : '온기우체부'}
          </p>
          <p className={styles.letterContent}>
            🧾 {modalType} 내용: {content}
          </p>
        </div>
        <Caution
          message={`❗개인정보나 욕설은 포함되지 않았나요?\n✅ ${modalType}를 전송하면 수정할 수 없어요.`}
        />
        <div className="modal-button-container">
          <button onClick={onClose} disabled={isLoading}>
            ✍️다시 확인
          </button>
          <button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? <LoadingSpinner spinnerSize={2} /> : '✅작성 완료'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
