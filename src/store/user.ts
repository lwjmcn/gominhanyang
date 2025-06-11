import { create } from 'zustand';
import { getMyInfo, updateUser } from '@/lib/api/user';
import { GenderType } from '@/lib/type/user.type';
import { isErrorResponse } from '@/lib/response_dto';

export interface UserInfo {
  nickname: string;
  gender: GenderType;
  age?: number;
  address: string;
  phone: string;
}

interface UserStore {
  userInfo: UserInfo;
  isLoading: boolean;
  setUserInfo: (info: UserInfo) => void;
  clearUserInfo: () => void;
  fetchUserInfo: () => Promise<void>;
  updateUserInfo: (info: UserInfo) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  userInfo: {
    nickname: '',
    gender: GenderType.OTHER,
    age: undefined,
    address: '',
    phone: '',
  },
  isLoading: false,
  setUserInfo: info => set({ userInfo: info }),
  clearUserInfo: () =>
    set({
      userInfo: {
        nickname: '',
        gender: GenderType.OTHER,
        age: undefined,
        address: '',
        phone: '',
      },
    }),
  fetchUserInfo: async () => {
    try {
      set({ isLoading: true });
      const response = await getMyInfo();
      if (!response || isErrorResponse(response)) {
        throw new Error(response?.error ?? '알 수 없는 오류가 발생했습니다.');
      }
      set({
        userInfo: {
          nickname: response.user.nickname,
          gender: response.user.gender,
          age: response.user.age,
          address: response.user.address || '',
          phone: response.user.phone || '',
        },
      });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  updateUserInfo: async info => {
    if (!info.nickname) {
      throw new Error('닉네임을 입력해주세요.');
    }

    try {
      set({ isLoading: true });
      const response = await updateUser(info);
      if (!response || isErrorResponse(response)) {
        throw new Error(response?.error ?? '알 수 없는 오류가 발생했습니다.');
      }
      set({ userInfo: info });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
