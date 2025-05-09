import { Link } from 'react-router-dom';

export default function LetterListPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Letter List Page</h1>
      <p>Your saved letters will be listed here!</p>
      <Link to={'/letters/1'}>Letter1</Link>
    </div>
  );
}
