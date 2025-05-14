import axios, { AxiosError } from 'axios';

import { AxiosResponse } from 'axios';
import { ResponseDto } from './response_dto';
export const responseHandler = <T>(response: AxiosResponse) => {
  const responseBody: T = response.data;

  const { message } = responseBody as ResponseDto;
  if (message == 'NO PERMISSION') {
    alert('로그인 후 이용해주세요.');
    window.location.href = '/signin';
  }

  return responseBody;
};

export const errorHandler = (error: AxiosError) => {
  console.error('ERROR:', error);
  return null;
};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
  config => {
    // axios 요청 시 헤더에 accessToken을 추가
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    // 요청 에러 처리
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);
