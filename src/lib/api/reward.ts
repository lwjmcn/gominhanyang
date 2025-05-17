import { axiosInstance, errorHandler, responseHandler } from '../axios';
import { ApiResponse } from '../response_dto';
import { API_ENDPOINTS } from '../constants/api';
import {
  GrantRewardRequestDto,
  GrantRewardResponseDto,
  MyRewardResponseDto,
} from '../dto/reward.dto';

export const grantReward = async (
  requestBody: GrantRewardRequestDto,
): Promise<ApiResponse<GrantRewardResponseDto>> => {
  const result = await axiosInstance
    .post(API_ENDPOINTS.REWARD.GRANT, requestBody)
    .then(responseHandler<ApiResponse<GrantRewardResponseDto>>)
    .catch(errorHandler);
  return result;
};

export const getMyReward = async (): Promise<ApiResponse<MyRewardResponseDto>> => {
  const result = await axiosInstance
    .get(API_ENDPOINTS.REWARD.MY)
    .then(responseHandler<ApiResponse<MyRewardResponseDto>>)
    .catch(errorHandler);
  return result;
};
