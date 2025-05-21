import { useState } from 'react';
import styles from './letterwriteform.module.css';
import Caution from '@/pages/post/send/components/Caution';

interface LetterWriteFormProps {
  content: string;
  onChange: (content: string) => void;
  disabled?: boolean;
  type: 'letter' | 'reply';
}

export default function LetterWriteForm({
  content,
  onChange,
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
      <Caution
        message={`⚠️ 편지 작성 시 유의사항\n타인에게 편지를 보낼 경우, 이름, 연락처, 주소 등 개인정보가 포함되지 않도록 주의해 주세요. 또한, 비난, 조롱, 위협 등 악의적인 내용은 절대 허용되지 않습니다.`}
      />

      <div className={styles.flexGrowWrapper}>
        <textarea
          className={styles.letterInput}
          placeholder="편지 내용을 입력하세요."
          maxLength={1000}
          value={content}
          onChange={handleContentChange}
          disabled={disabled}
        />
        <p className={styles.letterInputCount}>{length} / 1000</p>
      </div>
    </div>
  );
}
