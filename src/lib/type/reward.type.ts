export enum ActionType {
  WRITE = 'write_letter',
  REPLY = 'reply_letter',
  WRITE_LONG = 'long_letter_bonus',
}

export interface RewardItem {
  name: string;
  description: string;
  category: string;
}

export interface RewardItemDetail extends RewardItem {
  id: string;
}
