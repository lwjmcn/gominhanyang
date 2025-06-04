import { create } from 'zustand';

interface PointState {
  point: number;
  level: number;
  setPoint: (point: number) => void;
  setLevel: (level: number) => void;
}

export const usePointStore = create<PointState>(set => ({
  point: 0,
  level: 0,
  setPoint: point => set({ point }),
  setLevel: level => set({ level }),
}));
