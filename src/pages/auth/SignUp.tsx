import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.css';
import styles2 from './signup.module.css';
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
      <h2>회원가입</h2>
      <input
        className={styles.nicknameInput}
        type="text"
        name="nickname"
        placeholder="닉네임"
        value={formData.nickname}
        onChange={handleInputChange}
        disabled={isLoading}
      />
      <div className={styles2.genderAge}>
        <div className={styles2.genderContainer}>
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
        <div className={styles2.AgeContainer}>
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
      </div>
      <button className={styles.loginButton} onClick={handleSignup} disabled={isLoading}>
        {isLoading ? '가입 중...' : '가입하기'}
      </button>
      <Link to="/signin">로그인</Link>
    </div>
  );
}
