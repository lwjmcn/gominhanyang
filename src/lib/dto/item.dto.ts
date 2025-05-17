import { BaseResponse } from '../response_dto';
import { CategoryType, Item, ItemDetail, UnusedItem, UsedItem } from '../type/item.type';

export interface MyItemsRequestDto {
  category?: CategoryType;
}

export interface MyItemsResponseDto extends BaseResponse {
  items: Item[];
}

export interface ItemDetailResponseDto extends BaseResponse {
  item: ItemDetail;
}

export interface UseItemRequestDto {
  item_id: string;
}

export interface UseItemResponseDto extends BaseResponse {
  used_item: UsedItem;
}

export interface UnuseItemRequestDto {
  item_id: string;
}

export interface UnuseItemResponseDto extends BaseResponse {
  unused_item: UnusedItem;
}
