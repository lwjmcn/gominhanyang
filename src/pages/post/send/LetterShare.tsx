import { Link } from 'react-router-dom';

export default function LetterSharePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Letter Share Page</h1>
      <p>Share your letter with others!</p>
      <Link to={'/letter/write'}>Letter Write</Link>
    </div>
  );
}
