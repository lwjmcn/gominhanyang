export enum SendType {
  SELF = 'self',
  VOLUNTEER = 'volunteer',
  RANDOM = 'random',
}

export enum EmotionType {
  EXCITED = '기쁨',
  HAPPY = '행복',
  SAD = '슬픔',
  ANGRY = '화남',
  DEPRESSED = '우울',
}

export enum StatusType {
  SENT = 'sent',
  REPLIED = 'replied',
  AUTO_REPLIED = 'auto_replied',
}

export interface Letter {
  _id: string;
  from: string;
  from_nickname: string;
  title: string;
  emotion: EmotionType;
  created_at: string;
}
export interface Reply {
  _id: string;
  from: string;
  content: string;
  read: boolean;
  created_at: string;
}
export interface LetterDetail extends Letter {
  to: string;
  to_nickname: string;
  content: string;
  saved: boolean;
}

export interface RepliedLetter extends Letter {
  to: string;
  content: string;
  status: StatusType;
  replied_at: string;
}
