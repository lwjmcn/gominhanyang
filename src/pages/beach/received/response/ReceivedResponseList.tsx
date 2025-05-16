import Appbar from '@/components/Appbar';
import LetterListItem from '../../../../components/LetterListItem';
import { Link, useNavigate } from 'react-router-dom';

export default function ReceivedResponseListPage() {
  const navigate = useNavigate();
  const letters = [
    { id: 1, title: '첫 번째 답장', date: '2023-10-01', isAnswered: false },
    { id: 2, title: '두 번째 답장', date: '2023-10-02', isAnswered: true },
    { id: 3, title: '세 번째 답장', date: '2023-10-03', isAnswered: false },
    { id: 4, title: '네 번째 답장', date: '2023-10-04', isAnswered: true },
    { id: 5, title: '다섯 번째 답장', date: '2023-10-05', isAnswered: false },
  ];
  return (
    <>
      <Appbar title="" />
      <div>
        {letters.map(letter => (
          <LetterListItem
            letter={letter}
            key={letter.id}
            onClick={() => navigate(`/received/responses/${letter.id}`)}
          />
        ))}
      </div>
    </>
  );
}
