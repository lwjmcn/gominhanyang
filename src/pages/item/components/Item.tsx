// import { ITEM_IMAGE_URL } from '@/lib/constants/items';
// import styles from './item.module.css';
// interface Item {
//   id: string;
//   name: string;
//   isUsed: boolean;
// }

// interface ItemProps {
//   item: Item;
//   onClick: (itemId: string) => void;
// }

// export default function Item({ item, onClick }: ItemProps) {
//   const handleClick = () => {
//     onClick(item.id);
//   };

//   return (
//     <div onClick={handleClick} className={`${styles.gridItem} ${item.isUsed && styles.used}`}>
//       <img
//         src={ITEM_IMAGE_URL[item.name]}
//         alt={item.name}
//         style={{ objectFit: 'contain', width: '10rem', height: '10rem' }}
//       />
//       <p className={styles.title}>{item.name}</p>
//       <div className={`${styles.chip} ${item.isUsed && styles.used}`}>
//         {item.isUsed ? (
//           <img src="/image/item/check.svg" alt="사용중" className={styles.checkImage} />
//         ) : (
//           <img src="/image/item/circle.svg" alt="사용가능" className={styles.circleImage} />
//         )}
//         <p className={styles.chipText}>{item.isUsed ? '사용중' : '사용가능'}</p>
//       </div>
//     </div>
//   );
// }
