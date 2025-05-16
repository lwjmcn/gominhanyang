import styles from './letterlistitem.module.css';

interface Letter {
  _id: string;
  title: string;
  emotion: string;
  created_at: string;
}
interface LetterListItemProps {
  letter: Letter;
  onClick: () => void;
}

export default function LetterListItem({ letter, onClick }: LetterListItemProps) {
  return (
    <div className={styles.container} onClick={onClick}>
      <div>
        <h3 className={styles.title}>{letter.title}</h3>
      </div>
      <div>
        <p className={styles.date}>{new Date(letter.created_at).toLocaleDateString()}</p>
        <span className={styles.emotion}>{letter.emotion}</span>
      </div>
    </div>
  );
}
