export enum ActionType {
  WRITE = 'write_letters',
  REPLY = 'reply_letters',
}

export interface RewardItem {
  name: string;
  description: string;
  category: string;
}

export interface RewardItemDetail extends RewardItem {
  id: string;
}
