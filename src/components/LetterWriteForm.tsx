import { useState } from 'react';
import styles from './letterwriteform.module.css';
import Caution from '@/pages/post/send/components/Caution';
import { Textarea } from './Textarea';
import SpeechBubble from '@/pages/post/send/components/SpeechBubble';

interface LetterWriteFormProps {
  content: string;
  onChange: (content: string) => void;
  onSend: () => void;
  disabled?: boolean;
  type: 'letter' | 'reply';
}

export default function LetterWriteForm({
  content,
  onChange,
  onSend,
  disabled,
  type,
}: LetterWriteFormProps) {
  const [length, setLength] = useState(0);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setLength(value.length);
    onChange(value);
  };

  return (
    <div className={styles.container}>
      <Textarea
        type={type}
        placeholder="편지 내용을 입력하세요."
        maxLength={type === 'letter' ? 500 : 300}
        value={content}
        onChange={handleContentChange}
        disabled={disabled}
      >
        <p className={styles.letterInputCount}>
          {length} / {type === 'letter' ? 500 : 300}
        </p>
      </Textarea>
      <div className={styles.completeContainer}>
        <p className={styles.rewardInfo}>
          ✅ 200자 이상 작성하시면 리워드가 추가로 제공돼요.
          {'\n'}
          🎁 마음을 담아 길게 써주시면, 작은 보상을 드려요
        </p>
        <button className={styles.completeButton} onClick={onSend}>
          <img
            src="/image/write/paper_flight.webp"
            object-fit="cover"
            alt="complete"
            role="button"
          />
        </button>
      </div>
    </div>
  );
}
