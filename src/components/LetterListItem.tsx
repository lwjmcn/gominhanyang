interface Letter {
  id: number;
  title: string;
  date: string;
  content?: string;
  isAnswered: boolean;
  answer?: string;
}

export default function LetterListItem({
  letter,
  onClick,
}: {
  letter: Letter;
  onClick: () => void;
}) {
  return (
    <div onClick={onClick}>
      <p>{letter.title}</p>
      <p>{letter.date}</p>
      {letter.isAnswered && <p>답장</p>}
    </div>
  );
}
