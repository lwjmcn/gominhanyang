export enum CategoryType {
  SHELL = '조개 목걸이',
  STICKER = '온기 스티커',
  OCEAN = '등대 미니어처',
}

export interface Item {
  item_id: string;
  item_type: CategoryType;
  used: boolean;
}

export interface ItemDetail extends Item {
  granted_at: string;
  description: string;
}

export interface UsedItem extends Item {
  description: string;
  used_at: string;
}

export interface UnusedItem extends Item {
  description: string;
  unused_at: string;
}
