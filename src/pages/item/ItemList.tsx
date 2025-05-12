import { useLocation, useNavigate } from 'react-router-dom';
import Item from './components/Item';
import Appbar from '@/components/Appbar';
import { useState } from 'react';
import styles from './itemlist.module.css';

export default function ItemListPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: '보관함', value: 'storage' },
    { label: '사용중', value: 'inUse' },
    { label: '기타', value: 'others' },
  ];
  const [activeTab, setActiveTab] = useState(0);

  const items = [
    {
      id: 1,
      name: 'Item 1',
      description: 'Description for Item 1',
      isUsed: true,
      imageUrl: 'https://placehold.co/200x200',
    },
    {
      id: 2,
      name: 'Item 2',
      description: 'Description for Item 2',
      isUsed: false,
      imageUrl: 'https://placehold.co/200x200',
    },
    {
      id: 3,
      name: 'Item 3',
      description: 'Description for Item 3',
      isUsed: true,
      imageUrl: 'https://placehold.co/200x200',
    },
    {
      id: 4,
      name: 'Item 4',
      description: 'Description for Item 4',
      isUsed: false,
      imageUrl: 'https://placehold.co/200x200',
    },
    {
      id: 5,
      name: 'Item 5',
      description: 'Description for Item 5',
      isUsed: false,
      imageUrl: 'https://placehold.co/200x200',
    },
    {
      id: 6,
      name: 'Item 6',
      description: 'Description for Item 6',
      isUsed: false,

      imageUrl: 'https://placehold.co/200x200',
    },
    {
      id: 7,
      name: 'Item 7',
      description: 'Description for Item 7',
      isUsed: false,
      imageUrl: 'https://placehold.co/200x200',
    },
    {
      id: 8,
      name: 'Item 8',
      description: 'Description for Item 8',
      isUsed: true,
      imageUrl: 'https://placehold.co/200x200',
    },
    {
      id: 9,
      name: 'Item 9',
      description: 'Description for Item 9',
      isUsed: true,
      imageUrl: 'https://placehold.co/200x200',
    },
    {
      id: 10,
      name: 'Item 10',
      description: 'Description for Item 10',
      isUsed: false,
      imageUrl: 'https://placehold.co/200x200',
    },
  ];

  return (
    <>
      <Appbar title="아이템 보관함" />
      <div className={styles.container}>
        <div className={styles.tabList}>
          {tabs.map((tab, index) => (
            <button
              className={`${styles.tabButton} ${activeTab === index ? styles.active : ''}`}
              key={tab.value}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={styles.gridContainer}>
          {items.map(item => (
            <Item
              key={item.id}
              item={item}
              onClick={() =>
                navigate(`/items/${item.id}`, { state: { backgroundLocation: location } })
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
