import axios from '@/lib/axios';

export async function sendLetter(data: {
  from: string;
  to: 'random' | string;
  content: string;
  emotion: string;
}) {
  try {
    const res = await axios.post('/api/letters', data);
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 400 && err.response?.data?.error) {
      throw new Error(err.response.data.error); // 예: "유효하지 않은 수신 타입"
    }
    throw new Error('편지 전송 실패');
  }
}
