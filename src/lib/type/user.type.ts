export interface User {
  _id: string;
  nickname: string;
  age: number;
  gender: GenderType;
  status: JobType;
  email: string;
  address: string;
  phone: string;
  point: number;
  level: number;
  limited_access: boolean;
}

export enum GenderType {
  MALE = '남성',
  FEMALE = '여성',
  OTHER = '기타',
}

export enum JobType {
  UNEMPLOYED = '무직',
  STUDENT = '중/고등학생',
  UNIVERSITY_STUDENT = '대학생',
  FOREIGN_STUDENT = '유학생',
  HOUSEWIFE = '주부',
  OFFICE_WORKER = '직장인',
  SOLDIER = '군인',
  OTHER = '기타',
}
