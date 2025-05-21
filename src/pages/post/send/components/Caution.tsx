import styles from './caution.module.css';

export default function Caution({ message }: { message?: string }) {
  return <p className={styles.caution}>{message}</p>;
}
