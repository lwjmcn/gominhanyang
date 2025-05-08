import styles from '@/layout.module.css';
import ConsoleLog from '@/components/ConsoleLog';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <header />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Copyright © gominhanyang 2025.</footer>
      <ConsoleLog />
    </div>
  );
}
