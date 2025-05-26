import { axiosInstance, errorHandler, responseHandler } from '../axios';
import {
  LoginRequestDto,
  SignupRequestDto,
  UpdateUserRequestDto,
  SignupResponseDto,
  LoginResponseDto,
  UpdateUserResponseDto,
  UserMeResponseDto,
} from '../dto/user.dto';
import { ApiResponse, isErrorResponse } from '../response_dto';
import { API_ENDPOINTS } from '../constants/api';

const saveToken = (token: string) => {
  sessionStorage.setItem('accessToken', token);
};

export const signup = async (
  requestBody: SignupRequestDto,
): Promise<ApiResponse<SignupResponseDto>> => {
  const result = await axiosInstance
    .post(API_ENDPOINTS.USER.SIGNUP, requestBody)
    .then(responseHandler<ApiResponse<SignupResponseDto>>)
    .catch(errorHandler);

  if (result && !isErrorResponse(result)) {
    saveToken(result.token);
  }
  return result;
};

export const login = async (
  requestBody: LoginRequestDto,
): Promise<ApiResponse<LoginResponseDto>> => {
  const result = await axiosInstance
    .post(API_ENDPOINTS.USER.LOGIN, requestBody)
    .then(responseHandler<ApiResponse<LoginResponseDto>>)
    .catch(errorHandler);

  if (result && !isErrorResponse(result)) {
    saveToken(result.token);
  }
  return result;
};

export const getMyInfo = async (): Promise<ApiResponse<UserMeResponseDto>> => {
  const result = await axiosInstance
    .get(API_ENDPOINTS.USER.ME)
    .then(responseHandler<ApiResponse<UserMeResponseDto>>)
    .catch(errorHandler);
  return result;
};

export const updateUser = async (
  requestBody: UpdateUserRequestDto,
): Promise<ApiResponse<UpdateUserResponseDto>> => {
  const result = await axiosInstance
    .patch(API_ENDPOINTS.USER.UPDATE, requestBody)
    .then(responseHandler<ApiResponse<UpdateUserResponseDto>>)
    .catch(errorHandler);
  return result;
};

export const logout = () => {
  sessionStorage.removeItem('accessToken');
};
