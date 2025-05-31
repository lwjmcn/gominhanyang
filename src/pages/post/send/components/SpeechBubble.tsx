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
              ? '안녕하세요 :) 먼저 감정을 선택해주시면 제가 편지의 시작을 도와드릴게요.'
              : helpMessages}
          </TypeIt>
        </div>
        <button className={styles.refreshButton} onClick={onRefresh}>
          ▶ 도움 구하기
        </button>
      </div>
    </div>
  );
}
