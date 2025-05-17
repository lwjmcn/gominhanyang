import { axiosInstance, errorHandler, responseHandler } from '../axios';
import {
  LetterDetailResponseDto,
  ReplyLetterRequestDto,
  ReplyOptionsResponseDto,
  SendLetterRequestDto,
  SendLetterResponseDto,
  GetCommentsResponseDto,
  RandomLettersResponseDto,
  RepliedLettersResponseDto,
  ReplyLetterResponseDto,
  SavedLettersResponseDto,
} from '../dto/letter.dto';
import { ApiResponse } from '../response_dto';
import { API_ENDPOINTS } from '../constants/api';
import { AxiosError } from 'axios';

export const sendLetter = async (
  requestBody: SendLetterRequestDto,
): Promise<ApiResponse<SendLetterResponseDto>> => {
  const result = await axiosInstance
    .post(API_ENDPOINTS.LETTER.SEND, requestBody)
    .then(responseHandler<ApiResponse<SendLetterResponseDto>>)
    .catch(errorHandler);
  return result;
};

export const getRandomLetters = async (): Promise<ApiResponse<RandomLettersResponseDto>> => {
  const result = await axiosInstance
    .get(API_ENDPOINTS.LETTER.RANDOM)
    .then(responseHandler<ApiResponse<RandomLettersResponseDto>>)
    .catch(errorHandler);
  return result;
};

export const getLetterDetail = async (
  letterId: string,
): Promise<ApiResponse<LetterDetailResponseDto>> => {
  const result = await axiosInstance
    .get(API_ENDPOINTS.LETTER.DETAIL(letterId))
    .then(responseHandler<ApiResponse<LetterDetailResponseDto>>)
    .catch(errorHandler);
  return result;
};

export const getReplyOptions = async (
  letterId: string,
): Promise<ApiResponse<ReplyOptionsResponseDto>> => {
  const result = await axiosInstance
    .get(`${API_ENDPOINTS.LETTER.REPLY_OPTIONS}?letter_id=${letterId}`)
    .then(responseHandler<ApiResponse<ReplyOptionsResponseDto>>)
    .catch(errorHandler);
  return result;
};

export const replyToLetter = async (
  requestBody: ReplyLetterRequestDto,
): Promise<ApiResponse<ReplyLetterResponseDto>> => {
  const result = await axiosInstance
    .post(API_ENDPOINTS.LETTER.REPLY(requestBody.letter_id), requestBody)
    .then(responseHandler<ApiResponse<ReplyLetterResponseDto>>)
    .catch(errorHandler);
  return result;
};

export const getRepliedLetters = async (): Promise<ApiResponse<RepliedLettersResponseDto>> => {
  const result = await axiosInstance
    .get(API_ENDPOINTS.LETTER.REPLIED_TO_ME)
    .then(responseHandler<ApiResponse<RepliedLettersResponseDto>>)
    .catch(errorHandler);
  return result;
};

export const getLetterComments = async (
  letterId: string,
): Promise<ApiResponse<GetCommentsResponseDto>> => {
  const result = await axiosInstance
    .get(API_ENDPOINTS.LETTER.COMMENTS(letterId))
    .then(responseHandler<GetCommentsResponseDto>)
    .catch(errorHandler);
  return result;
};

export const getSavedLetters = async (): Promise<ApiResponse<SavedLettersResponseDto>> => {
  const result = await axiosInstance
    .get(API_ENDPOINTS.LETTER.SAVED)
    .then(responseHandler<ApiResponse<SavedLettersResponseDto>>)
    .catch(errorHandler);
  return result;
};
