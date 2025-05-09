import { Link } from 'react-router-dom';

export default function LetterCompletePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Letter Complete Page</h1>
      <p>Your letter has been completed!</p>
      <Link to={'/letters'}>편지보관함</Link>
      <Link to={'/items'}>아이템 적용하기</Link>
      <Link to={'/'}>메인으로</Link>
    </div>
  );
}
