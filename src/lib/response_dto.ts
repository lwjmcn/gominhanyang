// 기본 응답 타입
export interface BaseResponse {
  message: string;
}

// 에러 응답 타입
export interface ErrorResponse {
  error: string;
}

// 성공 또는 에러 응답
export type ApiResponse<T> = (T & BaseResponse) | ErrorResponse;

// 응답 타입 가드
export const isErrorResponse = (response: any): response is ErrorResponse => {
  return 'error' in response;
};

export const isSuccessResponse = <T>(response: ApiResponse<T>): response is T & BaseResponse => {
  return 'message' in response && !('error' in response);
};
