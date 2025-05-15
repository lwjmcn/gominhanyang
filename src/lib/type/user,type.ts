export interface User {
  _id: string;
  nickname: string;
  age: number;
  gender: GenderType;
  address: string;
  phone: string;
  point: number;
  limited_access: boolean;
}

export enum GenderType {
  MALE = '남성',
  FEMALE = '여성',
}
