export enum CategoryType {
  SHELL = 'shell',
  STICKER = 'sticker',
  FISH = 'fish',
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
