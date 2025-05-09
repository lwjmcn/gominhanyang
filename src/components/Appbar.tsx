import { useNavigate } from 'react-router-dom';
import styles from './appbar.module.css';

interface AppbarProps {
  title: string;
  nextButtonIcon?: string;
  nextButtonText?: string;
  onBackPress?: () => void;
  onNextPress?: () => void;
}

export default function Appbar({
  title,
  nextButtonIcon,
  nextButtonText,
  onBackPress,
  onNextPress,
}: AppbarProps) {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => {
          onBackPress && onBackPress();
          navigate(-1);
        }}
      >
        ◀
      </button>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.nextButton}>
        {nextButtonIcon && (
          <button onClick={onNextPress}>
            {nextButtonIcon}
            {nextButtonText}
          </button>
        )}
      </div>
    </div>
  );
}
