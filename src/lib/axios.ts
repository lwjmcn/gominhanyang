import axios, { AxiosError } from 'axios';
import { AxiosResponse } from 'axios';
import { ApiResponse, ErrorResponse } from './response_dto';
import { API_BASE_URL } from './constants/api';
import { ERROR_MESSAGES } from './constants/messages';

const logger = {
  request: (config: any) => {
    console.log('[API 요청]', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
      timestamp: new Date().toISOString(),
    });
  },
  response: (response: AxiosResponse) => {
    console.log('[API 응답]', {
      url: response.config.url,
      status: response.status,
      data: response.data,
      timestamp: new Date().toISOString(),
    });
  },
  error: (error: AxiosError) => {
    console.error('[API 에러]', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  },
};

export const responseHandler = <T>(response: AxiosResponse): ApiResponse<T> => {
  logger.response(response);
  const responseBody = response.data;
  return responseBody;
};

export const errorHandler = (error: AxiosError): ErrorResponse => {
  logger.error(error);

  const errorResponse = error.response?.data as ErrorResponse;
  if (errorResponse?.error) {
    return errorResponse;
  }

  // HTTP 상태 코드별 기본 에러 메시지
  switch (error.response?.status) {
    case 400:
      return { error: ERROR_MESSAGES.HTTP.BAD_REQUEST };
    case 401:
      sessionStorage.removeItem('accessToken');
      window.location.href = '/signin';
      return { error: ERROR_MESSAGES.HTTP.UNAUTHORIZED };
    case 403:
      return { error: ERROR_MESSAGES.HTTP.FORBIDDEN };
    case 404:
      return { error: ERROR_MESSAGES.HTTP.NOT_FOUND };
    case 500:
      return { error: ERROR_MESSAGES.HTTP.SERVER_ERROR };
    default:
      return { error: ERROR_MESSAGES.HTTP.UNKNOWN };
  }
};

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    logger.request(config);
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    logger.error(error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    logger.response(error);
    return Promise.reject(error);
  },
);
