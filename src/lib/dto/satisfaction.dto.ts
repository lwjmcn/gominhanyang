import { BaseResponse } from '../response_dto';

export interface SatisfactionRequestDto {
  letter_id: string;
  rating: number;
  reason: string;
}

export interface SatisfactionResponseDto extends BaseResponse {
  data: {
    _id: string;
    letter_id: string;
    creater_type: string;
    rating: number;
    reason: string;
    created_by: string;
    created_at: string;
  };
}
