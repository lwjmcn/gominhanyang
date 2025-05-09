import { Link } from 'react-router-dom';

export default function ReceivedPage() {
  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Received Page</h1>
        <p>Welcome to the received page!</p>
        <Link to="/received/letters">Received Letter List</Link>
        <Link to="/received/responses">Response List</Link>
      </div>
    </>
  );
}
