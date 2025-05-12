import Appbar from '@/components/Appbar';
import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './letterwrite.module.css';
import SpeechModal from './components/SpeechModal';
import StopWriteModal from './components/StopWriteModal';
import CompleteWriteModal from './components/CompleteWriteModal';

export default function LetterWritePage() {
  const nextButtonIcon = <img src="https://placehold.co/50x50" alt="question" />;

  const [length, setLength] = useState(0);

  const [openSpeech, setOpenSpeech] = useState(false);
  const [openStopWrite, setOpenStopWrite] = useState(false);
  const [openCompleteWrite, setOpenCompleteWrite] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { sendType: string };
  const [sendType, setSendType] = useState<string>(state.sendType || 'save');

  // 뒤로가기 감지 -> openStopWriteModal(true)

  return (
    <>
      {openSpeech && <SpeechModal onClose={() => setOpenSpeech(false)} />}
      {openStopWrite && <StopWriteModal onClose={() => setOpenStopWrite(false)} />}
      {openCompleteWrite && <CompleteWriteModal onClose={() => setOpenCompleteWrite(false)} />}
      <Appbar
        title=""
        nextButtonIcon={nextButtonIcon}
        onBackPress={() => {
          setOpenStopWrite(true);
          return;
        }}
        onNextPress={() => setOpenSpeech(true)}
      />
      <div className={styles.container}>
        <div className={styles.radioContainer}>
          <input
            type="radio"
            id="option1"
            name="options"
            value="save"
            checked={sendType === `save`}
            onChange={e => setSendType(e.target.value)}
          />
          <label htmlFor="option1">Option 1</label>
          <input
            type="radio"
            id="option2"
            name="options"
            value="random"
            checked={sendType === `random`}
            onChange={e => setSendType(e.target.value)}
          />
          <label htmlFor="option2">Option 2</label>
          <input
            type="radio"
            id="option3"
            name="options"
            value="send"
            checked={sendType === `send`}
            onChange={e => setSendType(e.target.value)}
          />
          <label htmlFor="option3">Option 3</label>
        </div>
        {/* divider */}
        <hr />
        <div className={styles.emotionContainer}>
          <img src="https://placehold.co/100x100" alt="emotion1" />
          <img src="https://placehold.co/100x100" alt="emotion2" />
          <img src="https://placehold.co/100x100" alt="emotion3" />
          <img src="https://placehold.co/100x100" alt="emotion3" />
          <img src="https://placehold.co/100x100" alt="emotion3" />
        </div>
        <caption className={styles.caution}>
          ⚠️ 편지 작성 시 유의사항{'\n'}
          타인에게 편지를 보낼 경우, 이름, 연락처, 주소 등 개인정보가 포함되지 않도록 주의해 주세요.
          또한, 비난, 조롱, 위협 등 악의적인 내용은 절대 허용되지 않습니다.{' '}
        </caption>

        <div className={styles.flexGrowWrapper}>
          <textarea
            className={styles.letterInput}
            placeholder="편지 내용을 입력하세요."
            maxLength={1000}
            onChange={e => {
              setLength(e.target.value.length);
            }}
          />
          <p className={styles.letterInputCount}>{length} / 1000</p>

          <div className={styles.completeContainer}>
            <caption className={styles.caution}>
              ✅ 100자 이상 작성하시면 리워드가 추가로 제공돼요.{'\n'}
              마음을 담아 길게 써주시면, 작은 보상을 드려요 🎁
            </caption>
            <button className={styles.completeButton} onClick={() => setOpenCompleteWrite(true)}>
              <img src="https://placehold.co/50x50" alt="complete" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
