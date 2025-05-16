import { Link, useNavigate } from 'react-router-dom';

export default function LetterCompletePage() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>편지가 저장되었어요</h2>
      <img src="https://placehold.co/400x200" alt="letter" />
      <p>+2 지급되었어요.{'\n'}지금까지/앞으로~~~</p>

      <div className="nav-button-container">
        <button onClick={() => navigate('/letters')}>
          <img src="https://placehold.co/50x50" alt="letter" />
          편지 보관함
        </button>
        <button onClick={() => navigate('/items')}>
          <img src="https://placehold.co/50x50" alt="storage" />
          아이템
        </button>
        <button onClick={() => navigate('/')}>
          <img src="https://placehold.co/50x50" alt="storage" />
          메인
        </button>
      </div>
    </div>
  );
}
