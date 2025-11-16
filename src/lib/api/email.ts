import { axiosInstance, errorHandler, responseHandler } from '../axios';
import { API_ENDPOINTS } from '../constants/api';
import {
  SendCodeRequestDto,
  SendCodeResponseDto,
  VerifyCodeRequestDto,
  VerifyCodeResponseDto,
} from '../dto/email.dto';
import { ApiResponse } from '../response_dto';

export const sendVerificationCode = async (
  requestBody: SendCodeRequestDto,
): Promise<ApiResponse<SendCodeResponseDto>> => {
  const result = await axiosInstance
    .post(API_ENDPOINTS.USER.EMAIL.SEND_CODE, requestBody)
    .then(responseHandler<ApiResponse<SendCodeResponseDto>>)
    .catch(errorHandler);

  return result;
};

export const verifyCode = async (
  requestBody: VerifyCodeRequestDto,
): Promise<ApiResponse<VerifyCodeResponseDto>> => {
  const result = await axiosInstance
    .post(API_ENDPOINTS.USER.EMAIL.VERIFY_CODE, requestBody)
    .then(responseHandler<ApiResponse<VerifyCodeResponseDto>>)
    .catch(errorHandler);

  return result;
};
