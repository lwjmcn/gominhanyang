import styles from './loadingspinner.module.css';

interface LoadingSpinnerProps {
  containerStyle?: React.CSSProperties;
  spinnerSize?: number;
  description?: string;
}
export const LoadingSpinner = ({
  containerStyle,
  spinnerSize = 4,
  description,
}: LoadingSpinnerProps) => {
  return (
    <div className={styles.loadingContainer} style={containerStyle}>
      {/* css variable로 주기 */}
      <div
        className={styles.loadingSpinner}
        style={{
          width: `${spinnerSize}rem`,
          height: `${spinnerSize}rem`,
          borderWidth: `${spinnerSize / 4}rem`,
          borderTopWidth: `${spinnerSize / 4}rem`,
        }}
      />
      {description && (
        <div className={styles.description}>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};
