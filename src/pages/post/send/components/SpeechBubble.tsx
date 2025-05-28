import styles from './speechbubble.module.css';
import { EmotionType } from '@/lib/type/letter.type';

interface SpeechBubbleProps {
  letterId?: string;
  emotion: EmotionType | null;
  partialLetter?: string;
  helpMessages: string[];
  onRefresh: () => void;
}

export default function SpeechBubble({ helpMessages, onRefresh }: SpeechBubbleProps) {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.content}>
          {helpMessages.length === 0 && <p>먼저 감정을 선택해주세요.</p>}
          {helpMessages.map((msg, index) => (
            <p key={`msg-${index}`}>{msg}</p>
          ))}
        </div>
        <button className={styles.refreshButton} onClick={onRefresh} />
      </div>
    </div>
  );
}
