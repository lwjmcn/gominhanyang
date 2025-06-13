import ConsoleLog from '@/components/ConsoleLog';
import Toast from './components/Toast';
import '@/global.css';
import { useEffect, useRef } from 'react';
import { useAudioStore } from './store/audio';

export default function Layout({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { audioOn } = useAudioStore();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = 0.8; // Play at 80% speed
    }
  }, []);

  return (
    <div className="layout">
      <audio
        ref={audioRef}
        src="/audio/chopin-nocturne-in-e-flat-major-op-9-no-2-162789.mp3"
        autoPlay
        loop
        hidden
        muted={!audioOn}
      />
      <header />
      <main className="main">{children}</main>
      {/* <footer className="footer">Copyright © gominhanyang 2025.</footer> */}
      {/* <ConsoleLog /> */}
      <Toast />
    </div>
  );
}
