import { BaseResponse } from '../response_dto';
import { ActionType, RewardItem } from '../type/reward.type';

export interface GrantRewardRequestDto {
  action: ActionType;
}

export interface GrantRewardResponseDto extends BaseResponse {
  action: ActionType;
  new_items: RewardItem[];
}

export interface MyRewardResponseDto extends BaseResponse {
  nickname: string;
  point: number;
  level: number;
}
