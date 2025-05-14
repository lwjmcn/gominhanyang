import Appbar from '@/components/Appbar';
import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './letterwrite.module.css';
import SpeechModal from './components/SpeechModal';
import StopWriteModal from './components/StopWriteModal';
import CompleteWriteModal from './components/CompleteWriteModal';

export default function LetterWritePage() {
  const nextButtonIcon = <img src="/icons/otterhelp.webp" alt="question" />;
  const [length, setLength] = useState(0);

  const [openSpeech, setOpenSpeech] = useState(false);
  const [openStopWrite, setOpenStopWrite] = useState(false);
  const [openCompleteWrite, setOpenCompleteWrite] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { sendType: string };
  const [sendType, setSendType] = useState<string>(state.sendType || 'save');

  return (
    <>
      {openSpeech && <SpeechModal onClose={() => setOpenSpeech(false)} />}
      {openStopWrite && <StopWriteModal onClose={() => setOpenStopWrite(false)} />}
      {openCompleteWrite && <CompleteWriteModal onClose={() => setOpenCompleteWrite(false)} />}
      <Appbar
        title=""
        nextButtonIcon={nextButtonIcon}
        onBackPress={() => setOpenStopWrite(true)}
        onNextPress={() => setOpenSpeech(true)}
      />

      <div className={styles.container}>
        <div className={styles.radioContainer}>
          <label htmlFor="option1">
            <input
              type="radio"
              id="option1"
              name="options"
              value="save"
              checked={sendType === 'save'}
              onChange={e => setSendType(e.target.value)}
            />
            <img src="/icons/office/writeletter_archive.webp" alt="보관함" />
            <span>보관함</span>
          </label>

          <label htmlFor="option2">
            <input
              type="radio"
              id="option2"
              name="options"
              value="random"
              checked={sendType === 'random'}
              onChange={e => setSendType(e.target.value)}
            />
            <img src="/icons/office/writeletter_anonymous.webp" alt="익명 친구" />
            <span>익명 친구</span>
          </label>

          <label htmlFor="option3">
            <input
              type="radio"
              id="option3"
              name="options"
              value="send"
              checked={sendType === 'send'}
              onChange={e => setSendType(e.target.value)}
            />
            <img src="/icons/office/writeletter_ongi.webp" alt="온기우체부" />
            <span>온기우체부</span>
          </label>
        </div>

        <img src="/icons/office/divider.webp" alt="divider" className={styles.dividerLine} />

        <div className={styles.emotionContainer}>
          <img src="/icons/office/emo_angry_unselected.webp" alt="angry" />
          <img src="/icons/office/emo_sad_unselected.webp" alt="sad" />
          <img src="/icons/office/emo_neutral_unselected.webp" alt="neutral" />
          <img src="/icons/office/emo_happy_unselected.webp" alt="happy" />
          <img src="/icons/office/emo_veryhappy_unselected.webp" alt="veryhappy" />
        </div>

        <p className={styles.caution}>
          ⚠️ 편지 작성 시 유의사항
          타인에게 편지를 보낼 경우, 이름, 연락처, 주소 등 개인정보가 포함되지 않도록 주의해 주세요.
          또한, 비난, 조롱, 위협 등 악의적인 내용은 절대 허용되지 않습니다.
        </p>

        <div className={styles.flexGrowWrapper}>
          <textarea
            className={styles.letterInput}
            placeholder="편지 내용을 입력하세요."
            maxLength={1000}
            onChange={e => setLength(e.target.value.length)}
          />
          <p className={styles.letterInputCount}>/ {length}자</p>

          <div className={styles.completeContainer}>
            <p className={styles.rewardText}>
              ✅ 100자 이상 정성껏 작성하면 리워드가 추가로 제공됩니다!
              🎁 마음을 담아 길게 써주시면, 작은 보상을 드려요.
            </p>
            <button className={styles.completeButton} onClick={() => setOpenCompleteWrite(true)}>
              <img src="/icons/sendbutton.webp" alt="complete" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
