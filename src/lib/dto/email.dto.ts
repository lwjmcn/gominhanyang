import { BaseResponse } from '../response_dto';

export interface SendCodeRequestDto {
  email: string;
}

export interface SendCodeResponseDto extends BaseResponse {
  expire_minutes: number;
}

export interface VerifyCodeRequestDto {
  email: string;
  code: string;
}

export interface VerifyCodeResponseDto extends BaseResponse {
  email_verification_token: string;
  email: string;
}
