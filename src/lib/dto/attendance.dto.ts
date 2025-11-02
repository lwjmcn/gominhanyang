import { BaseResponse } from '../response_dto';

export interface TodayAttendanceResponseDto extends BaseResponse {
  date: string; // YYYY-MM-DD (KST)
  attended: boolean;
  actions: string[];
  counts: Record<string, number>;
  first_action_at: string | null; // ISO
  last_action_at: string | null; // ISO
}

export interface MonthAttendanceRequestDto {
  month: string; // YYYY-MM
}

export interface MonthAttendanceDetailItem {
  actions: string[];
  first_action_at: string | null;
  last_action_at: string | null;
}

export interface MonthAttendanceResponseDto extends BaseResponse {
  dates: string[]; // all dates in requested range (YYYY-MM-DD)
  attended: string[]; // attended dates as strings YYYY-MM-DD
  detail: Record<string, MonthAttendanceDetailItem>; // YYYY-MM-DD -> detail
}
