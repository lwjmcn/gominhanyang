import { ResponseDto } from '../response_dto';

export interface LetterSendResponseDto extends ResponseDto {
  message: string;
  letter_id: string;
  to: string;
  title: string;
  emotion: string;
}
