import api from '@/lib/api';

// sendLetter 함수: 편지를 API로 전송
export const sendLetter = async (data: {
  from: string;
  to: 'random' | 'volunteer' | 'self';
  content: string;
  emotion: string;
}) => {
  const res = await api.post('/letter/send', data);
  return res.data;
};
