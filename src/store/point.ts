import { create } from 'zustand';
import { getMyReward } from '@/lib/api/reward';
import { isErrorResponse } from '@/lib/response_dto';

interface PointState {
  point: number;
  level: number;
  isLoading: boolean;
  setPoint: (point: number) => void;
  setLevel: (level: number) => void;
  clearPoint: () => void;
  fetchPoint: () => Promise<void>;
}

export const usePointStore = create<PointState>((set, get) => ({
  point: 0,
  level: 0,
  isLoading: false,
  setPoint: point => set({ point }),
  setLevel: level => set({ level }),
  clearPoint: () => set({ point: 0, level: 0 }),
  fetchPoint: async () => {
    try {
      set({ isLoading: true });
      const response = await getMyReward();
      if (!response || isErrorResponse(response)) {
        throw new Error(response?.error ?? '알 수 없는 오류가 발생했습니다.');
      }
      set({
        level: response.level,
        point: response.point,
      });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
