import { axiosInstance, errorHandler, responseHandler } from '../axios';
import {
  GenerateQuestionRequestDto,
  GenerateQuestionResponseDto,
  HelpQuestionRequestDto,
  HelpQuestionResponseDto,
} from '../dto/question.dto';
import { ApiResponse } from '../response_dto';
import { API_ENDPOINTS } from '../constants/api';

export const generateQuestion = async (
  requestBody: GenerateQuestionRequestDto,
): Promise<ApiResponse<GenerateQuestionResponseDto>> => {
  const result = await axiosInstance
    .post(API_ENDPOINTS.QUESTION.GENERATE, requestBody)
    .then(responseHandler<ApiResponse<GenerateQuestionResponseDto>>)
    .catch(errorHandler);
  return result;
};

export const getHelpQuestion = async (
  requestBody: HelpQuestionRequestDto,
): Promise<ApiResponse<HelpQuestionResponseDto>> => {
  const result = await axiosInstance
    .post(API_ENDPOINTS.QUESTION.HELP, requestBody)
    .then(responseHandler<ApiResponse<HelpQuestionResponseDto>>)
    .catch(errorHandler);
  return result;
};
