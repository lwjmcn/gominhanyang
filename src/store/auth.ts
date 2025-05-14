import { create } from 'zustand';

interface AuthState {
  isAuth: boolean;
  setLogin: () => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuth: false,
  setLogin: () => set({ isAuth: true }),
  setLogout: () => set({ isAuth: false }),
}));
