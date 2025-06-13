import { create } from 'zustand';

interface AudioState {
  audioOn: boolean;
  setAudioOn: (on: boolean) => void;
  toggleAudio: () => void;
}

export const useAudioStore = create<AudioState>(set => ({
  audioOn: true,
  setAudioOn: (on: boolean) => set({ audioOn: on }),
  toggleAudio: () => set(state => ({ audioOn: !state.audioOn })),
}));
