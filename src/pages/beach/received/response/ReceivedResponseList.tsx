import { Link } from 'react-router-dom';

export default function ReceivedResponseListPage() {
  return (
    <div>
      <h1>Response List</h1>
      <p>List of letters to respond will be displayed here.</p>
      <Link to={'/received/responses/1'}>Response1</Link>
    </div>
  );
}
