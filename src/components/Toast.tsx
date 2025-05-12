import { useToastStore } from '@/store/toast';
import styles from './toast.module.css';
import { useEffect } from 'react';

export default function Toast() {
  const { message, show, setShow } = useToastStore();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000); // 3초 후에 자동으로 Toast를 닫음

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [show]);

  return (
    <div className={`${styles.toastContainer} ${show ? styles.show : styles.hide}`}>
      <div className={styles.toastMessage}>
        {message}
        <button className={styles.closeButton} onClick={() => setShow(false)}>
          X
        </button>
      </div>
    </div>
  );
}
