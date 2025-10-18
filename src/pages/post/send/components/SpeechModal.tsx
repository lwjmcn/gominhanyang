import { LoadingSpinner } from '@/components/LoadingSpinner';
import styles from './speechmodal.module.css';
import { EmotionType } from '@/lib/type/letter.type';
import TypeIt from 'typeit-react';

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
      <TypeIt
        key={helpMessages.join('')}
        options={{
          cursor: false,
          speed: 30,
        }}
        style={{ whiteSpace: 'pre-line' }}
      >
        {helpMessages.length === 0
          ? '잠시만 기다려주세요...'
          : `이런 식으로 작성해볼 수 있어요.\n\n${helpMessages
              .map((m, i) => `${i + 1}. ${m}`)
              .join('\n\n')}`}
      </TypeIt>
    </div>
  );
}
