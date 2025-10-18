import { useAuthStore } from '@/store/auth';
import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.css';
import ReactGA from 'react-ga4';
import { login } from '@/lib/api/user';
import { isErrorResponse } from '@/lib/response_dto';
import { useState } from 'react';
import { useToastStore } from '@/store/toast';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useUserStore } from '@/store/user';
import { usePointStore } from '@/store/point';
import { useLetterStore } from '@/store/letter';
import { useItemStore } from '@/store/item';

export default function SignInPage() {
  const navigate = useNavigate();
  const { setLogin } = useAuthStore();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastStore();

  const { fetchUserInfo } = useUserStore();
  const { fetchPoint } = usePointStore();
  const { fetchSavedLetters } = useLetterStore();
  const { fetchItems } = useItemStore();

  const handleLogin = async () => {
    console.log('로그인 버튼 클릭');

    if (!nickname) {
      showToast('닉네임을 입력해주세요.');
      return;
    }

    if (!password) {
      showToast('비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    const response = await login({ nickname, password });

    if (!response) {
      showToast('알 수 없는 오류가 발생했습니다.');
      setIsLoading(false);
      return;
    }

    if (isErrorResponse(response)) {
      showToast(response.error);
      setIsLoading(false);
      return;
    }

    showToast(response.message);
    setIsLoading(false);
    setLogin();

    // 조회 API 호출
    Promise.all([fetchPoint(), fetchUserInfo(), fetchSavedLetters(), fetchItems()]);

    ReactGA.set({ user_id: response.nickname });
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.container}>
      <h1>마음의 항해</h1>
      <img
        className={styles.logoImage}
        src="image/login_setting/login_otter.webp"
        object-fit="cover"
        alt=""
      />
      <div className={styles.formContainer}>
        <div className={styles.labelContainer}>
          <label className={styles.label}>닉네임(ID)</label>
          <input
            className={styles.input}
            type="text"
            placeholder="닉네임(ID)"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className={styles.labelContainer}>
          <label className={styles.label}>비밀번호</label>
          <div className={styles.inputWithToggle}>
            <input
              className={styles.input}
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
        <button className={styles.loginButton} onClick={handleLogin} disabled={isLoading}>
          {isLoading ? <LoadingSpinner spinnerSize={2} /> : '로그인 하기'}
        </button>
      </div>
      <Link to="/signup" className={styles.link}>
        회원가입
      </Link>
    </div>
  );
}
