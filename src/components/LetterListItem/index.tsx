import styles from './styles.module.css';

interface Letter {
  id: number;
  title: string;
  date: string;
  content?: string;
  isAnswered: boolean;
  answer?: string;
}

export default function LetterListItem({
  letter,
  onClick,
}: {
  letter: Letter;
  onClick: () => void;
}) {
  return (
    <div className={styles.container} onClick={onClick}>
      <p className={styles.title}>{letter.title}</p>
      <p className={styles.date}>{letter.date}</p>
      <div 
        className={`${styles.emoji} ${letter.isAnswered ? styles.happy : styles.smile}`}
        role="img"
        aria-label={letter.isAnswered ? "Answered" : "Not answered"}
      />
    </div>
  );
} 