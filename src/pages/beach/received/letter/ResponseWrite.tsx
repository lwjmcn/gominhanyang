import { Link } from 'react-router-dom';

export default function ResponseWritePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Response Write Page</h1>
      <p>Write your response here!</p>
      <Link to={'/received/letters/:letterId/complete'}>Letter complete</Link>
    </div>
  );
}
