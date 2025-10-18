// import { useLocation, useNavigate } from 'react-router-dom';
// import Item from './components/Item';
// import Appbar from '@/components/Appbar';
// import { useState, useEffect, useMemo } from 'react';
// import styles from './itemlist.module.css';
// import { CategoryType } from '@/lib/type/item.type';
// import { useToastStore } from '@/store/toast';
// import { useItemStore } from '@/store/item';
// import { LoadingSpinner } from '@/components/LoadingSpinner';
// import { Nothing } from '@/components/Nothing';
// import Level from './components/Level';

// export default function ItemListPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { showToast } = useToastStore();
//   const { items, isLoading, fetchItems } = useItemStore();

//   const tabs = [
//     { label: '바다', value: CategoryType.OCEAN },
//     { label: '육지', value: CategoryType.BEACH },
//     { label: '캐릭터', value: CategoryType.OTTER },
//   ];

//   const [activeTab, setActiveTab] = useState(0);

//   useEffect(() => {
//     if (items.length === 0 && !isLoading)
//       fetchItems().catch(error => {
//         showToast(error.message || '아이템 목록을 불러오는데 실패했습니다.');
//       });
//   }, []);

//   const filteredItems = useMemo(() => {
//     const selectedCategory = tabs[activeTab].value;
//     return items.filter(item => item.category === selectedCategory);
//   }, [items, activeTab]);

//   return (
//     <div className={styles.pageBackground}>
//       <Appbar title="아이템 보관함" />
//       <div className={styles.container}>
//         <Level />
//         <div className={styles.tabList}>
//           {tabs.map((tab, index) => (
//             <button
//               className={`${styles.tabButton} ${activeTab === index ? styles.active : ''}`}
//               key={tab.value}
//               onClick={() => setActiveTab(index)}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//         <div className={styles.gridContainer}>
//           {isLoading ? (
//             <LoadingSpinner description="아이템을 불러오는 중..." />
//           ) : filteredItems.length === 0 ? (
//             <Nothing description="아직 아이템이 없어요." />
//           ) : (
//             <div className={styles.grid}>
//               {filteredItems.map(item => (
//                 <Item
//                   key={item.item_id}
//                   item={{
//                     id: item.item_id,
//                     name: item.name,
//                     isUsed: item.used,
//                   }}
//                   onClick={() =>
//                     navigate(`/items/${item.item_id}`, {
//                       state: { backgroundLocation: location },
//                     })
//                   }
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
