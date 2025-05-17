import Modal from '@/components/Modal';
import { useNavigate } from 'react-router-dom';

interface StopWriteModalProps {
  onClose: () => void;
  type: 'letter' | 'reply';
}

export default function StopWriteModal({ onClose, type }: StopWriteModalProps) {
  const navigate = useNavigate();
  const modalType = type === 'letter' ? '편지' : '답장';

  return (
    <Modal onClose={onClose}>
      <div>
        <h2>정말 {modalType}를 그만 쓰시겠어요?</h2>
        <p>지금까지 쓴 내용이 사라져요.</p>
        <div className="modal-button-container">
          <button
            onClick={() => {
              onClose();
              navigate(-1);
            }}
          >
            ✖️나가기
          </button>
          <button onClick={onClose}>✍️계속 쓰기</button>
        </div>
      </div>
    </Modal>
  );
}
