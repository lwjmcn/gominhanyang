import { BaseResponse } from '../response_dto';
import { GenderType, User } from '../type/user.type';

export interface SignupRequestDto {
  nickname: string;
  age: number;
  gender: GenderType;
  address?: string;
  phone?: string;
}

export interface LoginRequestDto {
  nickname: string;
}

export interface AuthResponseDto extends BaseResponse {
  token: string;
  nickname: string;
  limited_access: boolean;
}
export type SignupResponseDto = AuthResponseDto;
export type LoginResponseDto = AuthResponseDto;

export interface UpdateUserRequestDto {
  nickname: string;
  address: string;
  phone: string;
}

export interface UpdateUserResponseDto {
  updated_user: User;
}
