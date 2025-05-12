import Modal from '@/components/Modal';
import { useParams } from 'react-router-dom';
import styles from './components/item.module.css';

export default function ItemDetailModal() {
  const { itemId } = useParams();

  const handleApply = () => {
    // Handle item application logic here
  };

  const item = {
    id: 1,
    name: 'Item 1',
    description: 'Description for Item 1',
    isUsed: false,
    imageUrl: 'https://placehold.co/200x100',
  };

  return (
    <Modal>
      <h1>{item.name}</h1>
      <img src={item.imageUrl} alt={item.name} style={{ width: '100%' }} />
      <p>{item.description}</p>
      {item.isUsed ? (
        <button className={`${styles.chip} ${styles.used}`}>❎아이템 사용중</button>
      ) : (
        <button className={styles.chip} onClick={handleApply}>
          💚아이템 적용하기
        </button>
      )}
    </Modal>
  );
}
