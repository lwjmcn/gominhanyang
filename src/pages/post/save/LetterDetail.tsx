import Appbar from '@/components/Appbar';
import { useParams } from 'react-router-dom';

export default function LetterDetailPage() {
  const { letterId } = useParams();

  const letter = {
    id: 1,
    title: '첫 번째 편지',
    date: '2023-10-01',
    isAnswered: true,
    content: `안녕하세요! 첫 번째 편지입니다. 이 편지는 테스트용으로 작성되었습니다. 내용은 자유롭게 작성해 주세요. 편지의 내용은 나중에 수정할 수 없습니다. 편지를 작성하는 것은 정말 재미있고 창의적인 작업입니다. 편지를 통해 감정을 표현하고, 생각을 나누는 것은 소중한 경험이 될 것입니다. 편지를 쓰는 동안 즐거운 시간을 보내세요!`,
    answer: `안녕하세요! 답장입니다. 첫 번째 편지에 대한 답장을 작성해 보았습니다. 편지를 통해 소통하는 것은 정말 멋진 일이에요. 편지의 내용이 마음에 드셨기를 바랍니다. 앞으로도 계속해서 편지를 주고받으며 좋은 시간을 보내세요!`,
  };
  return (
    <>
      <Appbar title={`편지 ${letterId}`} />
      <div>
        <p>{letter.date}</p>
        <h2>{letter.title}</h2>

        <p>{letter.content}</p>

        {letter.isAnswered && (
          <>
            <hr />
            <p>{letter.answer}</p>
          </>
        )}
      </div>
    </>
  );
}
