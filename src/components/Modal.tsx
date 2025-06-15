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
        <button className={styles.closeButton} onClick={handleClose} />
        {props.children}
      </div>
    </div>
  );
}
