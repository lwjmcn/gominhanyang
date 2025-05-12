import api from '@/lib/api';

export const signup = async (data: {
  nickname: string;
  age: number;
  gender: '남성' | '여성';
  address?: string;
  phone?: string;
}) => {
  const res = await api.post('/users/signup', data);
  return res.data;
};

export const login = async (data: {
  username: string;
  password: string;
}) => {
  const res = await api.post('/users/login', data);
  return res.data;
};
