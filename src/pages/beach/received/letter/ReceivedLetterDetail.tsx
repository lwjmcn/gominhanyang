import Appbar from '@/components/Appbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLetterDetail } from '@/lib/api/letter';
import { LetterDetail } from '@/lib/type/letter.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';

export default function ReceivedLetterDetailPage() {
  const { letterId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [letter, setLetter] = useState<LetterDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLetterDetail = async () => {
    if (!letterId) {
      showToast('편지 ID가 없습니다.');
      navigate(-1);
      return;
    }

    setIsLoading(true);

    try {
      const response = await getLetterDetail(letterId);

      if (!response) {
        showToast('알 수 없는 오류가 발생했습니다.');
        return;
      }

      if (isErrorResponse(response)) {
        showToast(response.error);
        return;
      }

      setLetter(response.letter);
    } catch (error) {
      showToast('편지를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLetterDetail();
  }, [letterId]);

  const backgroundStyle = {
    backgroundImage: "url('/image/beach/background_blue.webp')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  if (isLoading) {
    return (
      <>
        <div style={backgroundStyle}>
          <Appbar title="편지 읽기" />

          <p>편지를 불러오는 중...</p>
        </div>
      </>
    );
  }

  if (!letter) {
    return (
      <>
        <div style={backgroundStyle}>
          <Appbar title="편지 읽기" />

          <p>편지를 찾을 수 없습니다.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div style={backgroundStyle}>
        <Appbar title="편지 읽기" />

        <p>{new Date(letter.created_at).toLocaleDateString()}</p>
        <h2>{letter.title}</h2>
        <p>{letter.content}</p>

        <button
          onClick={() =>
            navigate(`/received/letters/${letterId}/write`, {
              state: {
                letter: letter,
              },
            })
          }
        >
          답장하기
        </button>
      </div>
    </>
  );
}
