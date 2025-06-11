import { create } from 'zustand';
import { Letter, RepliedLetter, LetterDetail, Reply } from '@/lib/type/letter.type';
import {
  getSavedLetters,
  getRandomLetters,
  getRepliedLetters,
  getLetterDetail,
  getLetterComments,
} from '@/lib/api/letter';
import { isErrorResponse } from '@/lib/response_dto';

interface LetterDetailData {
  letter: LetterDetail;
  comments: Reply[];
}

interface LetterStore {
  // 저장된 편지 관련
  savedLetters: Letter[];
  isLoading: boolean;
  setSavedLetters: (letters: Letter[]) => void;
  clearSavedLetters: () => void;
  fetchSavedLetters: () => Promise<void>;

  // 받은 편지 관련
  receivedLetters: Letter[];
  isReceivedLettersLoading: boolean;
  setReceivedLetters: (letters: Letter[]) => void;
  clearReceivedLetters: () => void;
  fetchReceivedLetters: () => Promise<void>;

  // 받은 답장 관련
  receivedReplies: RepliedLetter[];
  isReceivedRepliesLoading: boolean;
  setReceivedReplies: (replies: RepliedLetter[]) => void;
  clearReceivedReplies: () => void;
  fetchReceivedReplies: () => Promise<void>;

  // 편지 상세 관련
  letterDetails: Map<string, LetterDetailData>;
  isLetterDetailLoading: boolean;
  setLetterDetail: (letterId: string, data: LetterDetailData) => void;
  clearLetterDetail: (letterId?: string) => void;
  fetchLetterDetail: (letterId: string) => Promise<void>;
}

export const useLetterStore = create<LetterStore>((set, get) => ({
  // 저장된 편지 관련
  savedLetters: [],
  isLoading: false,
  setSavedLetters: letters => set({ savedLetters: letters }),
  clearSavedLetters: () => set({ savedLetters: [] }),
  fetchSavedLetters: async () => {
    try {
      set({ isLoading: true });
      const response = await getSavedLetters();
      if (isErrorResponse(response)) {
        throw new Error(response.error);
      }
      set({ savedLetters: response.saved_letters });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // 받은 편지 관련
  receivedLetters: [],
  isReceivedLettersLoading: false,
  setReceivedLetters: letters => set({ receivedLetters: letters }),
  clearReceivedLetters: () => set({ receivedLetters: [] }),
  fetchReceivedLetters: async () => {
    if (get().isReceivedLettersLoading) return;

    try {
      set({ isReceivedLettersLoading: true });
      const response = await getRandomLetters();
      if (!response || isErrorResponse(response)) {
        throw new Error(response?.error ?? '알 수 없는 오류가 발생했습니다.');
      }
      set({ receivedLetters: response.unread_letters });
    } catch (error) {
      throw error;
    } finally {
      set({ isReceivedLettersLoading: false });
    }
  },

  // 받은 답장 관련
  receivedReplies: [],
  isReceivedRepliesLoading: false,
  setReceivedReplies: replies => set({ receivedReplies: replies }),
  clearReceivedReplies: () => set({ receivedReplies: [] }),
  fetchReceivedReplies: async () => {
    if (get().isReceivedRepliesLoading) return;

    try {
      set({ isReceivedRepliesLoading: true });
      const response = await getRepliedLetters();
      if (!response || isErrorResponse(response)) {
        throw new Error(response?.error ?? '알 수 없는 오류가 발생했습니다.');
      }
      set({ receivedReplies: response['replied-to-me'] });
    } catch (error) {
      throw error;
    } finally {
      set({ isReceivedRepliesLoading: false });
    }
  },

  // 편지 상세 관련
  letterDetails: new Map(),
  isLetterDetailLoading: false,
  setLetterDetail: (letterId, data) => {
    const newMap = new Map(get().letterDetails);
    newMap.set(letterId, data);
    set({ letterDetails: newMap });
  },
  clearLetterDetail: letterId => {
    if (letterId) {
      const newMap = new Map(get().letterDetails);
      newMap.delete(letterId);
      set({ letterDetails: newMap });
    } else {
      set({ letterDetails: new Map() });
    }
  },
  fetchLetterDetail: async (letterId: string) => {
    // 이미 데이터가 있다면 다시 가져오지 않음
    if (get().letterDetails.has(letterId)) return;

    try {
      set({ isLetterDetailLoading: true });
      const response = await getLetterDetail(letterId);
      if (!response || isErrorResponse(response)) {
        throw new Error(response?.error ?? '알 수 없는 오류가 발생했습니다.');
      }
      get().setLetterDetail(letterId, {
        letter: response.letter,
        comments: response.comments || [],
      });
    } catch (error) {
      throw error;
    } finally {
      set({ isLetterDetailLoading: false });
    }
  },
}));
