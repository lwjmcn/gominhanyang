import { axiosInstance, errorHandler, responseHandler } from '../axios';
import { API_ENDPOINTS } from '../constants/api';
import { SatisfactionRequestDto, SatisfactionResponseDto } from '../dto/satisfaction.dto';
import { ApiResponse } from '../response_dto';

export const sendSatisfaction = async (
  requestBody: SatisfactionRequestDto,
): Promise<ApiResponse<SatisfactionResponseDto>> => {
  const result = await axiosInstance
    .post(API_ENDPOINTS.SATISFACTION.BASE, requestBody)
    .then(responseHandler<ApiResponse<SatisfactionResponseDto>>)
    .catch(errorHandler);
  return result;
};
