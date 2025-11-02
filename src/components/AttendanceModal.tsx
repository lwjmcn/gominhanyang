import { useEffect, useMemo, useState } from 'react';
import Modal from './Modal';
import styles from './attendance.module.css';
import { getMonthAttendance } from '@/lib/api/attendance';

interface AttendanceModalProps {
  open?: boolean;
  onClose?: () => void;
}

export default function AttendanceModal({ open = false, onClose }: AttendanceModalProps) {
  const [localStamped, setLocalStamped] = useState<number[]>([]);
  const [animatingDay, setAnimatingDay] = useState<number | null>(null);

  const now = new Date();
  const year = now.getFullYear();
  const monthIndex = now.getMonth();

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstWeekday = useMemo(() => new Date(year, monthIndex, 1).getDay(), [year]);

  useEffect(() => {
    if (open) {
      const month = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
      getMonthAttendance({ month }).then((res: any) => {
        if (!res) return;

        const attendedDates: string[] = (res as any).attended || [];
        // convert YYYY-MM-DD to day numbers for the current month
        const attendedDays = attendedDates
          .map(d => {
            try {
              const parts = d.split('-');
              const dd = parseInt(parts[2], 10);
              return Number.isNaN(dd) ? null : dd;
            } catch {
              return null;
            }
          })
          .filter(Boolean) as number[];

        setLocalStamped(attendedDays);
      });

      const today = new Date();
      if (today.getMonth() === monthIndex && today.getFullYear() === year) {
        const todayDay = today.getDate();
        if (!localStamped.includes(todayDay)) {
          setAnimatingDay(todayDay);
          const t = setTimeout(() => {
            setLocalStamped(prev => {
              const next = [...prev, todayDay];
              return next;
            });
            setAnimatingDay(null);
          }, 750);

          return () => clearTimeout(t);
        }
      }
    }
  }, [open]);

  if (!open) return null;

  const cells: Array<null | number> = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <Modal contentStyles={{}} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src="/image/main/otter.webp" alt="otter" style={{ width: 'auto', height: '5rem' }} />
          <div>
            <div className={styles.title}>{monthIndex + 1}월 출석 체크</div>
            <div className={styles.sub}>귀여운 오터 발자국으로 출석을 모아요 💛</div>
          </div>
        </div>
        <div className={styles.calendarContainer}>
          <div className={styles.month}>{monthIndex + 1}月</div>
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
