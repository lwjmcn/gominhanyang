import Appbar from '@/components/Appbar';
import styles from './setting.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyInfo, updateUser } from '@/lib/api/user';
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
    age: undefined as number | undefined,
    address: '',
    phone: '',
  });

  const fetchUserData = async () => {
    try {
      const response = await getMyInfo();
      if (!response) {
        showToast('알 수 없는 오류가 발생했습니다.');
        return;
      }
      if (isErrorResponse(response)) {
        showToast(response.error);
        return;
      }
      const userData = response.user;
      setFormData({
        nickname: userData.nickname,
        gender: userData.gender,
        age: userData.age,
        address: userData.address || '',
        phone: userData.phone || '',
      });
    } catch (error) {
      showToast('회원 정보 조회 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUserData();
  }, []);

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
        <div className={styles.labelContainer}>
          <label className={styles.label}>닉네임(ID)</label>
          <input
            className={styles.input}
            type="text"
            name="nickname"
            placeholder="닉네임(ID)"
            value={formData.nickname}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
        <div className={styles.labelContainer}>
          <label className={styles.label}>성별 </label>
          <div className={styles.radioContainer}>
            <div className={styles.radioLabelContainer}>
              <input
                type="radio"
                name="gender"
                value={GenderType.MALE}
                checked={formData.gender === GenderType.MALE}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <label className={styles.ageLabel}>남</label>
            </div>
            <div className={styles.radioLabelContainer}>
              <input
                type="radio"
                name="gender"
                value={GenderType.FEMALE}
                checked={formData.gender === GenderType.FEMALE}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <label className={styles.ageLabel}>여</label>
            </div>
          </div>
        </div>
        <div className={styles.labelContainer}>
          <label className={styles.label}>출생연도</label>
          <input
            className={styles.input}
            name="age"
            type="number"
            placeholder="출생연도 ex. 2006"
            value={formData.age}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
        <div className={styles.labelContainer}>
          <label className={styles.label}>주소</label>
          <input
            className={styles.input}
            name="address"
            placeholder="온기우체부 편지를 받을 주소"
            value={formData.address}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
        {/* 
        <input
          type="tel"
          name="phone"
          placeholder="전화번호"
          value={formData.phone}
          onChange={handleInputChange}
          disabled={isLoading}
        /> */}
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
