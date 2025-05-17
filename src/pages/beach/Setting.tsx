import Appbar from '@/components/Appbar';
import styles from './setting.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '@/lib/api/user';
import { GenderType } from '@/lib/type/user.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import { useAuthStore } from '@/store/auth';

export default function SettingPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const { setLogout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    gender: GenderType.OTHER,
    age: 20,
    address: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!formData.nickname) {
      showToast('닉네임을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await updateUser(formData);

      if (!response) {
        showToast('알 수 없는 오류가 발생했습니다.');
        return;
      }

      if (isErrorResponse(response)) {
        showToast(response.error);
        return;
      }

      showToast('회원 정보가 수정되었습니다.');
    } catch (error) {
      showToast('회원 정보 수정 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setLogout();
    navigate('/signin', { replace: true });
  };

  return (
    <>
      <Appbar
        title={'설정'}
        nextButtonIcon={''}
        nextButtonText={'저장'}
        onBackPress={() => navigate(-1)}
        onNextPress={handleUpdate}
      />
      <div className={styles.container}>
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={formData.nickname}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <div>
          <p>성별</p>
          <div>
            <input
              type="radio"
              name="gender"
              value={GenderType.MALE}
              checked={formData.gender === GenderType.MALE}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <label>남</label>
            <input
              type="radio"
              name="gender"
              value={GenderType.FEMALE}
              checked={formData.gender === GenderType.FEMALE}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <label>여</label>
            <input
              type="radio"
              name="gender"
              value={GenderType.OTHER}
              checked={formData.gender === GenderType.OTHER}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <label>기타</label>
          </div>
        </div>
        <div>
          <p>나이대</p>
          <select name="age" value={formData.age} onChange={handleInputChange} disabled={isLoading}>
            <option value={10}>10대</option>
            <option value={20}>20대</option>
            <option value={30}>30대</option>
            <option value={40}>40대</option>
            <option value={50}>50대</option>
            <option value={60}>60대 이상</option>
          </select>
        </div>
        <input
          type="text"
          name="address"
          placeholder="주소"
          value={formData.address}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <input
          type="tel"
          name="phone"
          placeholder="전화번호"
          value={formData.phone}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button className={styles.saveButton} onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? '저장 중...' : '저장하기'}
        </button>

        <button className={styles.logoutButton} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </>
  );
}
