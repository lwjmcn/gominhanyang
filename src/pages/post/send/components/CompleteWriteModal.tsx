import Modal from '@/components/Modal';
import { useNavigate } from 'react-router-dom';

interface CompleteWriteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  type: 'letter' | 'reply';
  isLoading: boolean;
}

export default function CompleteWriteModal({
  onClose,
  onConfirm,
  type,
  isLoading,
}: CompleteWriteModalProps) {
  const navigate = useNavigate();

  const modalType = type === 'letter' ? '편지' : '답장';

  return (
    <Modal onClose={onClose}>
      <div>
        <h2>📝 {modalType}를 마무리 할 준비가 되셨나요?</h2>
        <p>아래 내용을 확인하고 {modalType} 작성을 완료할 수 있어요.</p>
        <div>
          <p>📤 전송 대상: 익명 사용자 🧾 {modalType} 내용: 첫시작부터~~....</p>
          <p>❗개인정보나 욕설은 포함되지 않았나요?</p>
          <p>✅ {modalType}를 전송하면 수정할 수 없어요.</p>
        </div>
        <div className="modal-button-container">
          <button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? '전송 중...' : '✅작성 완료'}
          </button>
          <button onClick={onClose} disabled={isLoading}>
            ✍️다시 확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
