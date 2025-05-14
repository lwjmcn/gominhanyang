export interface SignupRequestDto {
  nickname: string;
  age: number;
  gender: '남성' | '여성';
  address: string;
  phone: string;
}

export interface LoginRequestDto {
  nickname: string;
}

export interface UpdateUserRequestDto {
  nickname: string;
  address: string;
  phone: string;
}
