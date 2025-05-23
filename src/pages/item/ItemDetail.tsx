import Modal from '@/components/Modal';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './components/item.module.css';
import { getItemDetail, useItem, unuseItem } from '@/lib/api/item';
import { ItemDetail as ItemDetailType } from '@/lib/type/item.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';

export default function ItemDetailModal() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToastStore();
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
      fetchItemDetail(); // 상태 갱신을 위해 재조회
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
      fetchItemDetail(); // 상태 갱신을 위해 재조회
    } catch (error) {
      showToast('아이템 해제에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!item) return null;

  return (
    <Modal onClose={() => navigate(-1)}>
      <h1>{item.name}</h1>
      <img src="https://placehold.co/200x100" alt={item.name} style={{ width: '100%' }} />
      <p>{item.description}</p>
      <p className={styles.date}>획득일: {item.granted_at}</p>
      {item.used ? (
        <button
          className={`${styles.chip} ${styles.used}`}
          onClick={handleUnuse}
          disabled={isLoading}
        >
          {isLoading ? '처리 중...' : '❎아이템 해제하기'}
        </button>
      ) : (
        <button className={styles.chip} onClick={handleUse} disabled={isLoading}>
          {isLoading ? '처리 중...' : '💚아이템 적용하기'}
        </button>
      )}
    </Modal>
  );
}
