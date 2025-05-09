import { Link } from 'react-router-dom';

export default function ResponseCompletePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Response Complete Page</h1>
      <p>Your response has been successfully submitted!</p>
      <Link to={'/'}>메인으로</Link>
      <Link to={'/items'}>아이템 적용하기</Link>
    </div>
  );
}
