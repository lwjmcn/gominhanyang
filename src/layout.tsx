import ConsoleLog from '@/components/ConsoleLog';
import Toast from './components/Toast';
import '@/global.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <header />
      <main className="main">{children}</main>
      {/* <footer className="footer">Copyright © gominhanyang 2025.</footer> */}
      <ConsoleLog />
      <Toast />
    </div>
  );
}
