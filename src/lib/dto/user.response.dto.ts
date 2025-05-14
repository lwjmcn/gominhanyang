import { ResponseDto } from '../response_dto';

export interface SignupResponseDto extends ResponseDto {
  token: string;
  nickname: string;
  limited_access: boolean;
}

export interface LoginResponseDto extends ResponseDto {
  token: string;
  nickname: string;
  limited_access: boolean;
}
export interface UpdateUserResponseDto extends ResponseDto {
  updated_user: {
    _id: string;
    nickname: string;
    age: number;
    gender: '남성' | '여성';
    address: string;
    phone: string;
    point: number;
    limited_access: boolean;
  };
}
