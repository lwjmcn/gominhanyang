import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function ItemListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleOpenDetail = (itemId: number) => {
    // Logic to open the modal goes here
    console.log('Modal opened!');
    navigate(`/items/${itemId}`, { state: { backgroundLocation: location } });
  };
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Item List Page</h1>
      <p>List of items will be displayed here.</p>
      <button onClick={() => handleOpenDetail(1)}>Item 1</button>
    </div>
  );
}
