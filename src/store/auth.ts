import { create } from 'zustand';
import { useLetterStore } from './letter';
import { useUserStore } from './user';
import { usePointStore } from './point';
import { useItemStore } from './item';

interface AuthStore {
  isAuth: boolean;
  setLogin: () => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  isAuth: sessionStorage.getItem('accessToken') !== null,
  setLogin: () => set({ isAuth: true }),
  setLogout: () => {
    sessionStorage.removeItem('accessToken');

    // store 초기화화
    useLetterStore.getState().clearSavedLetters();
    useLetterStore.getState().clearReceivedLetters();
    useLetterStore.getState().clearReceivedReplies();
    useUserStore.getState().clearUserInfo();
    usePointStore.getState().clearPoint();
    useItemStore.getState().clearItems();

    set({ isAuth: false });
  },
}));
