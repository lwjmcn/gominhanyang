import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.css';
import { useToastStore } from '@/store/toast';
import { useState } from 'react';
import { signup } from '@/lib/api/user';
import { GenderType, JobType } from '@/lib/type/user.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useAuthStore } from '@/store/auth';
import ReactGA from 'react-ga4';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    gender: GenderType.OTHER,
    age: undefined,
    status: JobType.UNEMPLOYED,
    email: '',
    password: '',
    address: '',
    phone: '',
  });

  const { setLogin } = useAuthStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(
      prev =>
        ({
          ...prev,
          [name]: name === 'age' ? (value ? parseInt(value, 10) : undefined) : value,
        }) as any,
    );
  };

  const handleSignup = async () => {
    if (!formData.nickname) {
      showToast('닉네임(ID)을 입력해주세요.');
      return;
      // } else if (!formData.address) {
      //   // showToast('주소를 입력해주세요.');
      //   // return;
    } else if (!formData.age) {
      showToast('출생연도를 입력해주세요.');
      return;
    } else if (formData.age < 1900 || formData.age > new Date().getFullYear()) {
      showToast('유효한 출생연도를 입력해주세요.');
      return;
    } else if (!formData.email) {
      showToast('이메일을 입력해주세요.');
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showToast('유효한 이메일을 입력해주세요.');
      return;
    } else if (!formData.password || formData.password.length < 8) {
      showToast('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await signup({
        nickname: formData.nickname,
        gender: formData.gender,
        age: formData.age,
        status: formData.status,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        phone: formData.phone,
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
          <label className={styles.label}>사용할 닉네임(ID)*</label>
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
          <label className={styles.label}>비밀번호*</label>
          <div className={styles.inputWithToggle}>
            <input
              className={styles.input}
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="최소 8자"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
            >
              <img
                src={
                  showPassword
                    ? 'image/login_setting/visibility_off.svg'
                    : 'image/login_setting/visibility.svg'
                }
                alt="toggle password"
              />
            </button>
          </div>
        </div>
        <div className={styles.genderStatusRow}>
          <div className={styles.labelContainer}>
            <label className={styles.label}>성별*</label>
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
            <label className={styles.label}>직업*</label>
            <select
              className={styles.input}
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              disabled={isLoading}
            >
              {Object.values(JobType).map(jt => (
                <option key={jt} value={jt}>
                  {jt}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.labelContainer}>
          <label className={styles.label}>출생연도*</label>
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
          <label className={styles.label}>이메일*</label>
          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder="example@domain.com"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
        <div className={styles.labelContainer}>
          <label className={styles.label}>전화번호 (선택)</label>
          <input
            className={styles.input}
            name="phone"
            placeholder="010-0000-0000"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
        {/* <div className={styles.labelContainer}>
          <label className={styles.label}>주소</label>
          <input
            className={styles.input}
            name="address"
            placeholder="온기우체부 편지를 받을 주소"
            value={formData.address}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div> */}
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
