import { CategoryType } from '../type/item.type';

export interface ItemPosition {
  left?: string;
  right?: string;
  bottom?: string;
  top?: string;
  opacity?: string;
  width: string;
  height: string;
  transform?: string;
}

export const ITEM_POSITIONS: Record<string, ItemPosition> = {
  돌고래: {
    right: '30%',
    top: '30%',
    width: '8rem',
    height: '8rem',
  },
  '푸른 나무': {
    left: '0%',
    top: '30%',
    width: '10rem',
    height: '10rem',
  },
  '빨간 들꽃': {
    right: '10%',
    bottom: '15%',
    width: '6rem',
    height: '6rem',
  },
  '노란 나비': {
    left: '10%',
    bottom: '40%',
    width: '7rem',
    height: '7rem',
    transform: 'rotate(15deg)',
  },
  해파리: {
    right: '5%',
    top: '35%',
    opacity: '0.5',
    width: '7rem',
    height: '7rem',
  },
};

export const ITEM_CATEGORIES = {
  [CategoryType.OCEAN]: '바다',
  [CategoryType.BEACH]: '육지',
  [CategoryType.OTTER]: '캐릭터',
};

export const ITEM_IMAGE_URL: Record<string, string> = {
  '푸른 나무': '/image/item/tree.webp',
  돌고래: '/image/item/dolphin.webp',
  '빨간 들꽃': '/image/item/flower.webp',
  '노란 나비': '/image/item/butterfly.webp',
  해파리: '/image/item/jellyfish.webp',
};
