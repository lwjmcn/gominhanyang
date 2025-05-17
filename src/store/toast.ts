import { create } from 'zustand';

interface ToastState {
  message: string;
  show: boolean;
  setMessage: (message: string) => void;
  setShow: (show: boolean) => void;
  showToast: (message: string) => void;
}

export const useToastStore = create<ToastState>(set => ({
  message: '',
  show: false,
  setMessage: message => set({ message }),
  setShow: show => set({ show }),
  showToast: message => set({ message, show: true }),
}));
