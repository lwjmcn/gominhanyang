import Modal from '@/components/Modal';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './components/item.module.css';
import { getItemDetail, useItem, unuseItem } from '@/lib/api/item';
import { ItemDetail as ItemDetailType } from '@/lib/type/item.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import { useItemStore } from '@/store/item';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ITEM_IMAGE_URL } from '@/lib/constants/items';

export default function ItemDetailModal() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const { items, setItems } = useItemStore();
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState<ItemDetailType | null>(null);

  const fetchItemDetail = async () => {
    if (!itemId) {
      navigate(-1);
      return;
    }

    setIsLoading(true);
    try {
      const response = await getItemDetail(itemId);

      if (!response) {
        showToast('알 수 없는 오류가 발생했습니다.');
        navigate(-1);
        return;
      }

      if (isErrorResponse(response)) {
        showToast(response.error);
        navigate(-1);
        return;
      }

      setItem(response.item);
    } catch (error) {
      showToast('아이템 정보를 불러오는데 실패했습니다.');
      navigate(-1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItemDetail();
  }, [itemId]);

  const handleUse = async () => {
    if (!item) return;

    setIsLoading(true);
    try {
      const response = await useItem({ item_id: item.item_id });

      if (!response) {
        showToast('알 수 없는 오류가 발생했습니다.');
        return;
      }

      if (isErrorResponse(response)) {
        showToast(response.error);
        return;
      }

      showToast('아이템이 적용되었습니다.');
      setItem({ ...item, used: true });
      setItems(items.map(item => (item.item_id === item.item_id ? { ...item, used: true } : item)));
    } catch (error) {
      showToast('아이템 적용에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnuse = async () => {
    if (!item) return;

    setIsLoading(true);
    try {
      const response = await unuseItem({ item_id: item.item_id });

      if (!response) {
        showToast('알 수 없는 오류가 발생했습니다.');
        return;
      }

      if (isErrorResponse(response)) {
        showToast(response.error);
        return;
      }

      showToast('아이템 적용이 해제되었습니다.');
      setItem({ ...item, used: false });
      setItems(
        items.map(item => (item.item_id === item.item_id ? { ...item, used: false } : item)),
      );
    } catch (error) {
      showToast('아이템 해제에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!item) return null;

  return (
    <Modal onClose={() => navigate(-1)}>
      <h2>{item.item_name}</h2>
      <img
        src={ITEM_IMAGE_URL[item.item_name!]}
        alt={item.item_name}
        object-fit="contain"
        style={{ height: '16rem', width: 'auto', margin: '2rem 0' }}
      />
      <p>{item.description}</p>
      {item.used ? (
        <button
          className={`${styles.chip} ${styles.used}`}
          onClick={handleUnuse}
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner spinnerSize={2} /> : '❎해제하기'}
        </button>
      ) : (
        <button className={styles.chip} onClick={handleUse} disabled={isLoading}>
          {isLoading ? <LoadingSpinner spinnerSize={2} /> : '💚사용하기'}
        </button>
      )}
    </Modal>
  );
}
