import { create } from 'zustand';

interface AuthState {
  isAuth: boolean;
  logout: () => void;
  login: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuth: false,
  login: () => set({ isAuth: true }),
  logout: () => set({ isAuth: false }),
}));
