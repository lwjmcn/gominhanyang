import { create } from 'zustand';

interface AttendanceStore {
  showModal: boolean;
  attendance: number[]; // days in November that are stamped
  showAttendanceModal: () => void;
  hideAttendanceModal: () => void;
  setAttendance: (days: number[]) => void;
}

export const useAttendanceStore = create<AttendanceStore>(set => ({
  showModal: false,
  attendance: [1],
  showAttendanceModal: () => set({ showModal: true }),
  hideAttendanceModal: () => set({ showModal: false }),
  setAttendance: days => set({ attendance: days }),
}));

export default useAttendanceStore;
