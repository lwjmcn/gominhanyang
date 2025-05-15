export const ERROR_MESSAGES = {
  // HTTP 상태 코드 관련
  HTTP: {
    BAD_REQUEST: '잘못된 요청입니다.',
    UNAUTHORIZED: '로그인이 필요한 서비스입니다.',
    FORBIDDEN: '접근 권한이 없습니다.',
    NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
    SERVER_ERROR: '서버 오류가 발생했습니다.',
    UNKNOWN: '알 수 없는 오류가 발생했습니다.',
  },
  // 인증 관련
  AUTH: {
    INVALID_NICKNAME: '유효하지 않은 닉네임입니다.',
    REQUIRED_LOGIN: '로그인이 필요합니다.',
    EXPIRED_TOKEN: '로그인이 만료되었습니다. 다시 로그인해주세요.',
  },
  // 입력 검증 관련
  VALIDATION: {
    REQUIRED_FIELD: (field: string) => `${field}을(를) 입력해주세요.`,
    INVALID_FORMAT: (field: string) => `${field} 형식이 올바르지 않습니다.`,
    TOO_SHORT: (field: string, min: number) => `${field}은(는) ${min}자 이상이어야 합니다.`,
    TOO_LONG: (field: string, max: number) => `${field}은(는) ${max}자를 초과할 수 없습니다.`,
  },
} as const;

export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: '로그인되었습니다.',
    LOGOUT_SUCCESS: '로그아웃되었습니다.',
    SIGNUP_SUCCESS: '회원가입이 완료되었습니다.',
  },
  ITEM: {
    USE_SUCCESS: '아이템을 사용했습니다.',
    OBTAIN_SUCCESS: '아이템을 획득했습니다.',
  },
} as const;
