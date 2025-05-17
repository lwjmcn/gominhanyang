import { create } from 'zustand';

interface AuthState {
  isAuth: boolean;
  setLogin: () => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuth: sessionStorage.getItem('accessToken') !== null,
  setLogin: () => set({ isAuth: true }),
  setLogout: () => {
    sessionStorage.removeItem('accessToken');
    set({ isAuth: false });
  },
}));
