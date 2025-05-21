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
        <img
          className={styles.closeButton}
          onClick={onClose}
          src="/image/common/close.webp"
          alt="close"
          object-fit="cover"
        />
        {type === 'letter' && (
          <img
            className={styles.refreshButton}
            onClick={onRefresh}
            src="/image/write/refresh.webp"
            alt="refresh"
            object-fit="cover"
          />
        )}
        <div>
          <p>{'이런 식으로 작성해볼 수 있어요.\n'}</p>
          {!helpMessages && <p>...</p>}
          {helpMessages.map((msg, index) => (
            <p key={`msg-${index}`}>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
