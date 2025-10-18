import { BaseResponse } from '../response_dto';
import { GenderType, JobType, User } from '../type/user.type';

export interface SignupRequestDto {
  nickname: string;
  age: number | undefined;
  gender: GenderType;
  status: JobType;
  email: string;
  password: string;
  address?: string;
  phone?: string;
}

export interface LoginRequestDto {
  nickname: string;
  password: string;
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

export interface UserMeResponseDto {
  user: User;
}

export interface UpdateUserResponseDto {
  updated_user: User;
}
