import { BaseResponse } from '../response_dto';
import { EmotionType } from '../type/letter.type';

export interface GenerateQuestionRequestDto {
  emotion: EmotionType;
}

export interface GenerateQuestionResponseDto extends BaseResponse {
  question: string;
}

export interface HelpQuestionRequestDto {
  partial_letter: string;
}

export interface HelpQuestionResponseDto extends BaseResponse {
  help_question: string;
}
