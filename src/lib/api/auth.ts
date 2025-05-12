import axios from '@/lib/axios';

export async function signup(data: {
  nickname: string;
  age: number;
  gender: '남성' | '여성';
  address: string;
  phone: string;
}) {
  const res = await axios.post('/api/users/signup', data);
  return res.data;
}

export async function login(data: { nickname: string }) {
  const res = await axios.post('/api/users/login', data);
  return res.data;
}

export async function updateUser(data: {
  nickname: string;
  address: string;
  phone: string;
}) {
  const res = await axios.patch('/api/users/update', data);
  return res.data;
}
