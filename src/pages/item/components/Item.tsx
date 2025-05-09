import styles from './item.module.css';
interface Item {
  id: number;
  name: string;
  description: string;
  isUsed: boolean;
  imageUrl: string;
}

interface ItemProps {
  item: Item;
  onClick: (itemId: number) => void;
}

export default function Item({ item, onClick }: ItemProps) {
  const handleClick = () => {
    onClick(item.id);
  };

  return (
    <div onClick={handleClick} className={`${styles.gridItem} ${item.isUsed && styles.used}`}>
      <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px' }} />
      <p className={styles.title}>{item.name}</p>
      <div className={`${styles.chip} ${item.isUsed && styles.used}`}>
        <p className={styles.chipText}>{item.isUsed ? '❎사용중' : '💚사용가능'}</p>
      </div>
    </div>
  );
}
