import styles from './speechmodal.module.css';
import { EmotionType } from '@/lib/type/letter.type';

interface SpeechModalProps {
  onClose?: () => void;
  type: 'letter' | 'reply';
  letterId?: string;
  emotion?: EmotionType;
  partialLetter?: string;
  helpMessages: string[];
  onRefresh: () => void;
}

export default function SpeechModal({ onClose, type, helpMessages, onRefresh }: SpeechModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖️
        </button>
        <div>
          <p>{'이런 식으로 작성해볼 수 있어요.\n'}</p>
          {helpMessages.map((msg, index) => (
            <p key={`msg-${index}`}>{msg}</p>
          ))}
        </div>
        {type === 'letter' && (
          <button className={styles.closeButton} onClick={onRefresh}>
            🔃
          </button>
        )}
      </div>
    </div>
  );
}
