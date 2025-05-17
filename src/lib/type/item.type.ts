export enum CategoryType {
  OCEAN = '바다아이템',
  BEACH = '육지아이템',
  OTTER = '캐릭터아이템',
}

export interface Item {
  item_id: string;
  name: string;
  used: boolean;
  category: CategoryType;
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
