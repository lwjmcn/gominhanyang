import Modal from '@/components/Modal';
import { useState } from 'react';
import styles from './AddressModal.module.css';

interface AddressModalProps {
  onClose: () => void;
}

export default function AddressModal({ onClose }: AddressModalProps) {
  const [address, setAddress] = useState('');
  return (
    <Modal>
      <div className={styles.modalContainer}>
          <button className={styles.confirmButton} style={{ position: 'absolute', top: 16, right: 16 }} onClick={onClose}>
            <img src="/icons/submit_check.svg" alt="닫기" />
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="" alt="otter" style={{ width: 80, height: 80, marginBottom: 8 }} />
            <h2 style={{ fontSize: '3.5rem', margin: '0.5rem ', lineHeight: '1.2' }}>이 편지의 손편지 답장을<br/> 어디로 보내드릴까요?</h2>
            <p style={{ fontSize: '2rem', textAlign: 'center', margin: '0.5rem 0', lineHeight: '1.3' }}>
              약 3~4주 후, 마음을 담아 도착할 거예요.<br />
              온기우체부가 꼭 전달해드릴게요!
            </p>
            <input
              type="text"
              placeholder="주소 입력하기"
              value={address}
              onChange={e => setAddress(e.target.value)}
              style={{ width: '80%', padding: '0.7rem', fontSize: '1.1rem', borderRadius: 8, border: '1px solid #ccc', margin: '1rem 0' }}
            />
            <button className={styles.submitButton} style={{ width: '80%', fontSize: '1.2rem' }}>
              <img src="/icons/office/addresspopup_submit.webp" style={{width: 200, height: 80}} />
              <span>전송하기</span>
            </button>
          </div>
        </div>
    </Modal>
  );
} 