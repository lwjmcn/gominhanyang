import { useLocation, useNavigate } from 'react-router-dom';
import Item from './components/Item';
import Appbar from '@/components/Appbar';
import { useState, useEffect, useMemo } from 'react';
import styles from './itemlist.module.css';
import { getMyItems } from '@/lib/api/item';
import { Item as ItemType, CategoryType } from '@/lib/type/item.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import { useItemStore } from '@/store/item';

export default function ItemListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToastStore();
  const { items, setItems } = useItemStore();

  const tabs = [
    { label: '바다', value: CategoryType.OCEAN },
    { label: '육지', value: CategoryType.BEACH },
    { label: '캐릭터', value: CategoryType.OTTER },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const response = await getMyItems();

      if (!response) {
        showToast('알 수 없는 오류가 발생했습니다.');
        return;
      }

      if (isErrorResponse(response)) {
        showToast(response.error);
        return;
      }

      setItems(response.items);
    } catch (error) {
      showToast('아이템 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (items.length === 0) {
      fetchItems();
    }
  }, [location]);

  const filteredItems = useMemo(() => {
    const selectedCategory = tabs[activeTab].value;
    return items.filter(item => item.category === selectedCategory);
  }, [items, activeTab]);

  return (
    <div className={styles.pageBackground}>
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
          {isLoading ? (
            <div>로딩 중...</div>
          ) : filteredItems.length === 0 ? (
            <div>아이템이 없습니다.</div>
          ) : (
            filteredItems.map(item => (
              <Item
                key={item.item_id}
                item={{
                  id: item.item_id,
                  name: item.name,
                  isUsed: item.used,
                  imageUrl: '/image/item/dolphin.webp', // TODO: 이미지 URL 추가
                }}
                onClick={() =>
                  navigate(`/items/${item.item_id}`, {
                    state: { backgroundLocation: location },
                  })
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
