import { axiosInstance, errorHandler, responseHandler } from '../axios';
import {
  ItemDetailResponseDto,
  MyItemsRequestDto,
  MyItemsResponseDto,
  UnuseItemRequestDto,
  UnuseItemResponseDto,
  UseItemRequestDto,
  UseItemResponseDto,
} from '../dto/item.dto';
import { ApiResponse } from '../response_dto';
import { API_ENDPOINTS } from '../constants/api';

export const getMyItems = async (
  params?: MyItemsRequestDto,
): Promise<ApiResponse<MyItemsResponseDto>> => {
  const url = params?.category
    ? `${API_ENDPOINTS.ITEM.MY}?category=${params.category}`
    : API_ENDPOINTS.ITEM.MY;
  const result = await axiosInstance
    .get(url)
    .then(responseHandler<ApiResponse<MyItemsResponseDto>>)
    .catch(errorHandler);
  return result;
};

export const getItemDetail = async (
  itemId: string,
): Promise<ApiResponse<ItemDetailResponseDto>> => {
  const result = await axiosInstance
    .get(API_ENDPOINTS.ITEM.DETAIL(itemId))
    .then(responseHandler<ApiResponse<ItemDetailResponseDto>>)
    .catch(errorHandler);
  return result;
};

export const useItem = async (
  requestBody: UseItemRequestDto,
): Promise<ApiResponse<UseItemResponseDto>> => {
  const result = await axiosInstance
    .post(API_ENDPOINTS.ITEM.USE, requestBody)
    .then(responseHandler<ApiResponse<UseItemResponseDto>>)
    .catch(errorHandler);
  return result;
};

export const unuseItem = async (
  requestBody: UnuseItemRequestDto,
): Promise<ApiResponse<UnuseItemResponseDto>> => {
  const result = await axiosInstance
    .post(API_ENDPOINTS.ITEM.UNUSE, requestBody)
    .then(responseHandler<ApiResponse<UnuseItemResponseDto>>)
    .catch(errorHandler);
  return result;
};
