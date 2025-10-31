import { useEffect, useMemo, useState } from 'react';
import Modal from './Modal';
import styles from './attendance.module.css';
import { useAttendanceStore } from '@/store/attendance';

export default function AttendanceModal() {
  const { showModal, hideAttendanceModal, attendance, setAttendance } = useAttendanceStore();

  const [localStamped, setLocalStamped] = useState<number[]>(attendance);
  const [animatingDay, setAnimatingDay] = useState<number | null>(null);

  const now = new Date();
  const year = now.getFullYear();
  const monthIndex = 10; // November

  const daysInMonth = 30; // November has 30 days

  // weekday of the 1st (0=Sun...6=Sat)
  const firstWeekday = useMemo(() => new Date(year, monthIndex, 1).getDay(), [year]);

  useEffect(() => {
    // sync local with store when modal opens
    if (showModal) {
      setLocalStamped(attendance || []);

      const today = new Date();
      if (today.getMonth() === monthIndex && today.getFullYear() === year) {
        const todayDay = today.getDate();
        if (!attendance.includes(todayDay)) {
          // animate stamping today's day
          setAnimatingDay(todayDay);
          // after animation, add to localStamped and update store
          const t = setTimeout(() => {
            setLocalStamped(prev => {
              const next = [...prev, todayDay];
              setAttendance(next);
              return next;
            });
            setAnimatingDay(null);
          }, 750);

          return () => clearTimeout(t);
        }
      }
    }
  }, [showModal]);

  if (!showModal) return null;

  const cells: Array<null | number> = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <Modal contentStyles={{}} onClose={() => hideAttendanceModal()}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src="/image/main/otter.webp" alt="otter" style={{ width: 'auto', height: '5rem' }} />
          <div>
            <div className={styles.title}>11월 출석 체크</div>
            <div className={styles.sub}>귀여운 오터 발자국으로 출석을 모아요 💛</div>
          </div>
        </div>
        <div className={styles.calendarContainer}>
          <div className={styles.month}>11月</div>
          <div className={styles.calendar}>
            {['일', '월', '화', '수', '목', '금', '토'].map(w => (
              <div key={w} className={styles.weekday}>
                {w}
              </div>
            ))}

            {cells.map((c, idx) => {
              if (c === null)
                return <div key={idx} className={`${styles.cell} ${styles.emptyCell}`} />;

              const stamped = localStamped.includes(c);
              const isAnimating = animatingDay === c;

              return (
                <div key={idx} className={styles.cell}>
                  <div>{c}</div>
                  {(stamped || isAnimating) && (
                    <div className={`${styles.stamp} ${isAnimating ? styles.pop : ''}`}>
                      <img src="/image/login_setting/paw.svg" className={styles.stampImg} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
}
