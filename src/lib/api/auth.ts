import axios from 'axios';
import { axiosInstance, errorHandler, responseHandler } from '../axios';
import { LoginRequestDto, SignupRequestDto, UpdateUserRequestDto } from '../dto/user.request.dto';
import {
  LoginResponseDto,
  SignupResponseDto,
  UpdateUserResponseDto,
} from '../dto/user.response.dto';

const AUTH_API_URL = `${import.meta.env.VITE_API_URL}/users`;

export const signup = async (requestBody: SignupRequestDto) => {
  const result = await axios
    .post(`${AUTH_API_URL}/send`, requestBody)
    .then(responseHandler<SignupResponseDto>)
    .catch(errorHandler);
  return result;
};
export const login = async (requestBody: LoginRequestDto) => {
  const result = await axios
    .post(`${AUTH_API_URL}/login`, requestBody)
    .then(responseHandler<LoginResponseDto>)
    .catch(errorHandler);
  return result;
};
export const updateUser = async (requestBody: UpdateUserRequestDto) => {
  const result = await axiosInstance
    .patch(`${AUTH_API_URL}/update`, requestBody)
    .then(responseHandler<UpdateUserResponseDto>)
    .catch(errorHandler);
  return result;
};
