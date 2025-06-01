import { create } from 'zustand';
import { Item } from '@/lib/type/item.type';

interface ItemState {
  items: Item[];
  setItems: (items: Item[]) => void;
  getUsedItems: () => Item[];
}

export const useItemStore = create<ItemState>((set, get) => ({
  items: [],
  setItems: items => set({ items }),
  getUsedItems: () => get().items.filter(item => item.used),
}));
