import { axiosInstance, errorHandler, responseHandler } from '../axios';
import { API_ENDPOINTS } from '../constants/api';
import { ApiResponse } from '../response_dto';
import {
  TodayAttendanceResponseDto,
  MonthAttendanceResponseDto,
  MonthAttendanceRequestDto,
} from '../dto/attendance.dto';

export const getTodayAttendance = async (): Promise<ApiResponse<TodayAttendanceResponseDto>> => {
  const result = await axiosInstance
    .get(API_ENDPOINTS.ATTENDANCE.TODAY)
    .then(responseHandler<ApiResponse<TodayAttendanceResponseDto>>)
    .catch(errorHandler);

  return result;
};

export const getMonthAttendance = async (params: MonthAttendanceRequestDto) => {
  const result = await axiosInstance
    .get(API_ENDPOINTS.ATTENDANCE.MONTH, { params })
    .then(responseHandler<ApiResponse<MonthAttendanceResponseDto>>)
    .catch(errorHandler);

  return result;
};
