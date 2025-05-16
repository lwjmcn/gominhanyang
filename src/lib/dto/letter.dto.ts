import { BaseResponse } from '../response_dto';
import {
  Letter,
  LetterDetail,
  SendType,
  RepliedLetter,
  Reply,
  EmotionType,
} from '../type/letter.type';

export interface SendLetterRequestDto {
  from: string;
  to: SendType;
  content: string;
  emotion: EmotionType;
}

export interface SendLetterResponseDto extends BaseResponse {
  letter_id: string;
  to: string;
  title: string;
  emotion: EmotionType;
}

export interface RandomLettersResponseDto extends BaseResponse {
  unread_letters: Letter[];
}

export interface GetCommentsResponseDto {
  comments: Reply[];
}

export interface LetterDetailResponseDto extends BaseResponse {
  letter: LetterDetail;
  comments?: Reply[];
}

export interface ReplyLetterRequestDto {
  letter_id: string;
  reply: string;
}

export interface ReplyLetterResponseDto extends BaseResponse {}

export interface RepliedLettersResponseDto extends BaseResponse {
  'replied-to-me': RepliedLetter[];
}

export interface ReplyOptionsResponseDto extends BaseResponse {
  questions: string[];
}

export interface SavedLettersResponseDto extends BaseResponse {
  saved_letters: Letter[];
}
