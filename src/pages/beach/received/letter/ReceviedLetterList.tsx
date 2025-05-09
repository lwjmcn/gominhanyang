import { Link } from 'react-router-dom';

export default function ReceivedLetterListPage() {
  return (
    <div>
      <h1>Received Letter List</h1>
      <p>List of received letters will be displayed here.</p>
      <Link to={'/received/letters/1'}>Letter1</Link>
    </div>
  );
}
