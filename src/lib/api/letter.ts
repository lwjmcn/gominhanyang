import axios from 'axios';
import { LetterSendRequestDto } from '../dto/letter.request.dto';
import { axiosInstance, errorHandler, responseHandler } from '../axios';
import { LetterSendResponseDto } from '../dto/letter.response.dto';

const LETTER_API_URL = `${import.meta.env.VITE_API_URL}/letter`;

export const sendLetter = async (requestBody: LetterSendRequestDto) => {
  const result = await axiosInstance // TODO 인증 필요할 것 같은데 백엔드 문의 필요
    .post(`${LETTER_API_URL}/send`, requestBody)
    .then(responseHandler<LetterSendResponseDto>)
    .catch(errorHandler);
  return result;
};
