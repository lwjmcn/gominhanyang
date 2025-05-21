import { useNavigate } from 'react-router-dom';
import styles from './modal.module.css';

interface ModalProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

export default function Modal(props: ModalProps) {
  const navigate = useNavigate();

  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <img
          className={styles.closeButton}
          onClick={handleClose}
          src="/image/common/close.webp"
          alt="close"
          object-fit="cover"
        />
        {props.children}
      </div>
    </div>
  );
}
