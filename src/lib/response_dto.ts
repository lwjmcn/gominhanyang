export interface ResponseDto {
  message?: string;
}

export type ResponseBody<T> = T | ResponseDto | null;
