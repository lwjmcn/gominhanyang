import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.css';
import { useToastStore } from '@/store/toast';
import { useState } from 'react';
import { signup } from '@/lib/api/user';
import { GenderType } from '@/lib/type/user.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useAuthStore } from '@/store/auth';
import ReactGA from 'react-ga4';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    gender: GenderType.OTHER,
    age: undefined,
    address: '',
  });

  const { setLogin } = useAuthStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    if (!formData.nickname) {
      showToast('닉네임(ID)을 입력해주세요.');
      return;
    } else if (!formData.address) {
      showToast('주소를 입력해주세요.');
      return;
    } else if (!formData.age) {
      showToast('출생연도를 입력해주세요.');
      return;
    } else if (formData.age < 1900 || formData.age > new Date().getFullYear()) {
      showToast('유효한 출생연도를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await signup({
        nickname: formData.nickname,
        gender: formData.gender,
        age: formData.age,
        address: formData.address,
      });

      if (!response) {
        showToast('알 수 없는 오류가 발생했습니다.');
        return;
      }

      if (isErrorResponse(response)) {
        showToast(response.error);
        return;
      }
      setLogin();
      ReactGA.set({ user_id: response.nickname });
      showToast('가입이 완료되었습니다.');
      navigate('/signin');
    } catch (error) {
      showToast('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>회원가입</h1>
      <div className={styles.formContainer}>
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
        <button className={styles.loginButton} onClick={handleSignup} disabled={isLoading}>
          {isLoading ? <LoadingSpinner spinnerSize={2} /> : '가입하기'}
        </button>
      </div>
      <Link to="/signin" className={styles.link}>
        로그인
      </Link>
    </div>
  );
}
