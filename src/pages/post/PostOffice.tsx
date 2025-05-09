import Appbar from '@/components/Appbar';
import { Link } from 'react-router-dom';

export default function PostOfficePage() {
  return (
    <>
      <Appbar title="" />

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Post Office Page</h1>
        <p>Welcome to the post office page!</p>
        <Link to="/letter/share">편지작성</Link>

        <Link to="/letters">편지보관함</Link>
      </div>
    </>
  );
}
