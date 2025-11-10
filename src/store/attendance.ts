import { create } from 'zustand';

interface AttendanceStore {
  showModal: boolean;
  showAttendanceModal: () => void;
  hideAttendanceModal: () => void;
}

export const useAttendanceStore = create<AttendanceStore>(set => ({
  showModal: false,
  showAttendanceModal: () => set({ showModal: true }),
  hideAttendanceModal: () => set({ showModal: false }),
}));

export default useAttendanceStore;
