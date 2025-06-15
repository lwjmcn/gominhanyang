import { EmotionIcon, EmotionType } from '@/lib/type/letter.type';
import styles from './letterlistitem.module.css';

interface Letter {
  _id: string;
  title: string;
  emotion: EmotionType;
  created_at: string;
}
interface LetterListItemProps {
  letter: Letter;
  onClick: () => void;
}

export default function LetterListItem({ letter, onClick }: LetterListItemProps) {
  return (
    <button className={styles.container} onClick={onClick}>
      <div>
        <h3 className={styles.title}>{letter.title}</h3>
      </div>
      <div className={styles.infoSection}>
        <p className={styles.date}>{new Date(letter.created_at).toLocaleDateString()}</p>
        <img
          src={`/image/write/emotion_${EmotionIcon[letter.emotion]}.webp`}
          alt={letter.emotion}
          className={styles.emotionIcon}
        />
      </div>
    </button>
  );
}
