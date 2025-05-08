import { useEffect, useState } from 'react';

function safeStringify(obj: any) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '';
      seen.add(value);
    }
    return value;
  });
}

export default function ConsoleLog() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const originalLog = console.log;

    console.log = (...args: any[]) => {
      originalLog(...args);
      setLogs(prev => [
        ...prev.slice(-30), // Keep the latest 30 logs
        args
          .map((arg: any) => (typeof arg === 'object' ? safeStringify(arg) : String(arg)))
          .join(' '),
      ]);
    };

    return () => {
      console.log = originalLog; // 복원
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        width: '60vw',
        height: '200px',
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: 'lime',
        fontSize: '28px',
        overflowY: 'auto',
        padding: '8px',
        zIndex: 9999,
      }}
    >
      {logs.map((log, idx) => (
        <div key={'log' + idx}>{log}</div>
      ))}
    </div>
  );
}
