import Appbar from '@/components/Appbar';
import { useNavigate } from 'react-router-dom';

export default function LetterListPage() {
  const navigate = useNavigate();
  const letters = [
    { id: 1, title: '첫 번째 편지', date: '2023-10-01', isAnswered: false },
    { id: 2, title: '두 번째 편지', date: '2023-10-02', isAnswered: true },

    { id: 3, title: '세 번째 편지', date: '2023-10-03', isAnswered: false },
    { id: 4, title: '네 번째 편지', date: '2023-10-04', isAnswered: true },
    { id: 5, title: '다섯 번째 편지', date: '2023-10-05', isAnswered: false },
  ];
  return (
    <>
      <Appbar title="나의 보관함" />
      <div>
        {letters.map(letter => (
          <div
            className="letter-item"
            key={letter.id}
            onClick={() => navigate(`/letters/${letter.id}`)}
          >
            <p>{letter.title}</p>
            <p>{letter.date}</p>
            {letter.isAnswered && <p>답장</p>}
          </div>
        ))}
      </div>
    </>
  );
}
