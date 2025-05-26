export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  // 사용자 관련
  USER: {
    BASE: '/api/users',
    LOGIN: '/api/users/login',
    SIGNUP: '/api/users/signup',
    ME: '/api/users/me',
    UPDATE: '/api/users/update',
  },
  // 편지 관련
  LETTER: {
    BASE: '/letter',
    SEND: '/letter/send',
    RANDOM: '/letter/random',
    DETAIL: (id: string) => `/letter/${id}`,
    REPLY_OPTIONS: '/letter/reply-options',
    REPLY: (id: string) => `/letter/reply`,
    REPLIED_TO_ME: '/letter/replied-to-me',
    SAVED: '/letter/saved',
    COMMENTS: (letterId: string) => `/letter/for-letter/${letterId}`,
  },
  // 아이템 관련
  ITEM: {
    BASE: '/item',
    MY: '/item/my',
    DETAIL: (id: string) => `/item/${id}`,
    USE: '/item/use',
    UNUSE: '/item/unuse',
  },
  // 질문 관련
  QUESTION: {
    BASE: '/question',
    GENERATE: '/question/generate',
    HELP: '/question/help',
  },
  // 보상 관련
  REWARD: {
    BASE: '/reward',
    GRANT: '/reward/grant',
    MY: '/reward/my',
  },
} as const;
