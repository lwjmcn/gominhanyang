import styles from './nothing.module.css';

interface NothingProps {
  containerStyle?: React.CSSProperties;
  description?: string;
}
export const Nothing = ({ description, containerStyle }: NothingProps) => {
  return (
    <div className={styles.container} style={containerStyle}>
      <img src="/image/common/empty_box.webp" alt="Nothing" className={styles.image} />
      <p className={styles.description}>{description || '아직 아무것도 없어요.'}</p>
    </div>
  );
};
