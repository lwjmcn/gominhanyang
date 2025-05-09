import { useNavigate } from 'react-router-dom';
import styles from './modal.module.css';

interface ModalProps {
  children?: React.ReactNode;
}

export default function Modal(props: ModalProps) {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <button className={styles.closeButton} onClick={handleClose}>
          X
        </button>
        {props.children}
      </div>
    </div>
  );
}
