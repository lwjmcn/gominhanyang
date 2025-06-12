import { create } from 'zustand';
import { Item } from '@/lib/type/item.type';
import { getMyItems } from '@/lib/api/item';
import { isErrorResponse } from '@/lib/response_dto';

interface ItemState {
  items: Item[];
  isLoading: boolean;
  setItems: (items: Item[]) => void;
  clearItems: () => void;
  fetchItems: () => Promise<void>;
}

export const useItemStore = create<ItemState>((set, get) => ({
  items: [],
  isLoading: false,
  setItems: items => set({ items }),
  clearItems: () => set({ items: [] }),
  fetchItems: async () => {
    try {
      set({ isLoading: true });
      const response = await getMyItems();
      if (!response || isErrorResponse(response)) {
        throw new Error(response?.error ?? '알 수 없는 오류가 발생했습니다.');
      }
      set({ items: response.items });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
