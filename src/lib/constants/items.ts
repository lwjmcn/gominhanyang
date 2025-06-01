import { CategoryType } from '../type/item.type';

export interface ConstantItem {
  item_id: string;
  name: string;
  description: string;
  image_url: string;
  category: CategoryType;
}

export const ITEM_LIST: ConstantItem[] = [
  {
    item_id: '1',
    name: '돌고래',
    description: '바다에서 헤엄치는 돌고래',
    image_url: '/image/item/dolphin.webp',
    category: CategoryType.BEACH,
  },
];
