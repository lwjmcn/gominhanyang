import { Link } from 'react-router-dom';

export default function LetterWritePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Letter Write Page</h1>
      <p>Write your letter here!</p>
      <Link to={'/letter/complete'}>Letter complete</Link>
    </div>
  );
}
