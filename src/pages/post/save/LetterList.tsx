import Appbar from '@/components/Appbar';
import LetterListItem from '../../../components/LetterListItem';
import { useNavigate } from 'react-router-dom';

export default function LetterListPage() {
  const navigate = useNavigate();
  const letters = [
    { id: 1, title: '저장된 편지 1', date: '2023-10-01', isAnswered: false },
    { id: 2, title: '저장된 편지 2', date: '2023-10-02', isAnswered: true },
    { id: 3, title: '저장된 편지 3', date: '2023-10-03', isAnswered: false },
  ];

  return (
    <>
      <Appbar title="" />
      <div>
        {letters.map(letter => (
          <LetterListItem
            letter={letter}
            key={letter.id}
            onClick={() => navigate(`/post/save/${letter.id}`)}
          />
        ))}
      </div>
    </>
  );
}
