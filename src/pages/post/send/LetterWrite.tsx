import Appbar from '@/components/Appbar';
import { useState } from 'react';
import styles from './letterwrite.module.css';
import SpeechModal from './components/SpeechModal';
import StopWriteModal from './components/StopWriteModal';
import CompleteWriteModal from './components/CompleteWriteModal';
import AddressModal from './components/AddressModal';
import { useNavigate } from 'react-router-dom';

export default function LetterWritePage() {
  const [length, setLength] = useState(0);
  const [sendType, setSendType] = useState('save');
  const [showSpeech, setShowSpeech] = useState(false);
  const [showStop, setShowStop] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const navigate = useNavigate();
  
  return (
    <div className={styles.bg}>
      <div className={styles.card}>
        <Appbar title="" />
        <button
          type="button"
          className={styles.helpButton}
          onClick={() => setShowSpeech(true)}
          style={{ zIndex:10, position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <img src="/icons/otterhelp.webp" alt="도움말" style={{  width: 200, height: 200}} />
        </button>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input type="radio" name="options" value="save" checked={sendType === 'save'} onChange={e => setSendType(e.target.value)} />
            <img className={styles.radioIcon} src="/icons/office/writeletter_archive.webp" alt="보관함" />
            <span>보관함</span>
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" name="options" value="random" checked={sendType === 'random'} onChange={e => setSendType(e.target.value)} />
            <img className={styles.radioIcon} src="/icons/office/writeletter_anonymous.webp" alt="익명 친구" />
            <span>익명 친구</span>
          </label>
          <label className={styles.radioLabel}>
            <input type="radio" name="options" value="send" checked={sendType === 'send'} onChange={e => setSendType(e.target.value)} />
            <img className={styles.radioIcon} src="/icons/office/writeletter_ongi.webp" alt="온기우체부" />
            <span>온기우체부</span>
          </label>
        </div>
        <div className={styles.emojiGroup}>
          <img className={styles.emojiIcon} src="/icons/office/emo_angry_unselected.webp" alt="angry" />
          <img className={styles.emojiIcon} src="/icons/office/emo_sad_unselected.webp" alt="sad" />
          <img className={styles.emojiIcon} src="/icons/office/emo_neutral_unselected.webp" alt="neutral" />
          <img className={styles.emojiIcon} src="/icons/office/emo_happy_unselected.webp" alt="happy" />
          <img className={styles.emojiIcon} src="/icons/office/emo_veryhappy_unselected.webp" alt="veryhappy" />
        </div>
        <div className={styles.caution}>
          <div>⚠ 편지 작성 시 유의사항</div>
          <div>타인에게 편지를 보낼 경우, 이름, 연락처, 주소 등 개인정보가 포함되지 않도록 주의해 주세요.<br/> 또한, 비난, 조롱, 위협 등 악의적인 내용은 절대 허용되지 않습니다.</div>
        </div>
        <div className={styles.letterPaperWrapper}>
        <div className={styles.letterPaper}>
        </div>  
        <textarea
            className={styles.letterInput}
            placeholder="편지 내용을 입력하세요."
            maxLength={1000}
            onChange={e => setLength(e.target.value.length)}
          />
          <span className={styles.letterInputCount}>/ {length}자</span>
        </div>
        <div className={styles.bottomRowWrapper}>
          <div className={styles.bottomRow}>
              <div>
                <span>✅ 100자 이상 정성껏 작성하면 리워드가 추가로 제공됩니다!</span>
              </div>
              <div> 
                <span> 담아 길게 써주시면, 작은 보상을 드려요.</span>
              </div>
            </div>
            <button
              className={styles.completeButton}
              onClick={() => setShowComplete(true)}
            >
              <img src="/icons/office/sendbutton.webp" alt="complete" />
            </button>
        </div>
          </div>
      {showSpeech && <SpeechModal onClose={() => setShowSpeech(false)} />}
      {showStop && <StopWriteModal onClose={() => setShowStop(false)} />}
      {showComplete && <CompleteWriteModal onClose={() => setShowComplete(false)} onNext={() => {
         setShowComplete(false); 
         navigate('/letter/complete');
         if (sendType === 'send') {
          setShowAddress(true);
         }
      }} />}
      {showAddress && <AddressModal onClose={() => setShowAddress(false)} />}
    </div>
  );
}
