import { useNavigate } from 'react-router-dom';
import styles from './appbar.module.css';

interface AppbarProps {
  title: string;
  nextButtonIcon?: React.ReactNode;
  nextButtonText?: string;
  onBackPress?: () => void;
  onNextPress?: () => void;
  showBackButton?: boolean;
}

export default function Appbar({
  title,
  nextButtonIcon,
  nextButtonText,
  onBackPress,
  onNextPress,
  showBackButton = true,
}: AppbarProps) {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => {
          onBackPress ? onBackPress() : navigate(-1);
        }}
        >
          <img src="/icons/goback.webp" alt="뒤로가기" />
        </button>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.nextButtonContainer}>
        {nextButtonIcon && (
          <button onClick={onNextPress} className={styles.nextButton}>
            {nextButtonIcon}
            {nextButtonText}
          </button>
        )}
      </div>
    </div>
  );
}