import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.css';
import { useToastStore } from '@/store/toast';
import { useState } from 'react';
import { signup } from '@/lib/api/user';
import { GenderType } from '@/lib/type/user.type';
import { isErrorResponse } from '@/lib/response_dto';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    gender: GenderType.OTHER,
    age: 20,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    if (!formData.nickname) {
      showToast('닉네임을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await signup(formData);

      if (!response) {
        showToast('알 수 없는 오류가 발생했습니다.');
        return;
      }

      if (isErrorResponse(response)) {
        showToast(response.error);
        return;
      }

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
        <button className={styles.loginButton} onClick={handleSignup} disabled={isLoading}>
          {isLoading ? '가입 중...' : '가입하기'}
        </button>
      </div>
      <Link to="/signin" className={styles.link}>
        로그인
      </Link>
    </div>
  );
}
