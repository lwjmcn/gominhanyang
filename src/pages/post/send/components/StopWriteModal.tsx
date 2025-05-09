import Modal from '@/components/Modal';
import { useNavigate } from 'react-router-dom';

interface StopWriteModalProps {
  onClose: () => void;
}

export default function StopWriteModal({ onClose }: StopWriteModalProps) {
  const navigate = useNavigate();
  return (
    <Modal>
      <div>
        <h2>정말 편지를 그만 쓰시겠어요?</h2>
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
