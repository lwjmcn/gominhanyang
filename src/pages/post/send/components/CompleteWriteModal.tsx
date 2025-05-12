import Modal from '@/components/Modal';
import { useNavigate } from 'react-router-dom';

interface CompleteWriteModalProps {
  onClose: () => void;
}

export default function CompleteWriteModal({ onClose }: CompleteWriteModalProps) {
  const navigate = useNavigate();
  return (
    <Modal>
      <div>
        <h2>📝 편지를 마무리 할 준비가 되셨나요?</h2>
        <p>아래 내용을 확인하고 편지 작성을 완료할 수 있어요.</p>
        <div>
          <p>📤 전송 대상: 익명 사용자 🧾 편지 내용: 첫시작부터~~....</p>
          <p>❗개인정보나 욕설은 포함되지 않았나요?</p>
          <p>✅ 편지를 전송하면 수정할 수 없어요.</p>
        </div>
        <div className="modal-button-container">
          <button
            onClick={() => {
              onClose();
              navigate('/letter/complete');
            }}
          >
            ✅작성 완료
          </button>
          <button onClick={onClose}>✍️다시 확인</button>
        </div>
      </div>
    </Modal>
  );
}
