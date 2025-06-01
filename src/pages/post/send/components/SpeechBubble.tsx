import styles from './speechbubble.module.css';
import { EmotionType } from '@/lib/type/letter.type';
import TypeIt from 'typeit-react';

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
          <TypeIt
            key={helpMessages.join('')}
            options={{
              cursor: false,
              speed: 30,
            }}
          >
            {helpMessages.length === 0
              ? '안녕하세요. 저는 온달이에요. 편지를 시작하는 게 어렵거나 도중에 막히면 언제든지 도와드릴게요.'
              : helpMessages}
          </TypeIt>
        </div>
        <button className={styles.refreshButton} onClick={onRefresh}>
          ▶ 도움이 필요해요
        </button>
      </div>
    </div>
  );
}
