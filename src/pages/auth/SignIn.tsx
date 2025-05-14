import { useAuthStore } from '@/store/auth';
import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.css';

export default function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = () => {
    login();
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.background}>
  {/* 화면 맨 위에 고정된 타이틀 */}
  <h1 className={styles.title}>마음의 항해</h1>

  {/* 하단에 위치한 폼 영역 */}
  <div className={styles.bottomBox}>
    <div className={styles.inputContainer}>
      <label htmlFor="nickname" className={styles.label}>닉네임(ID)</label>
      <div className={styles.inputWrapper}>
        <input
          id="nickname"
          className={styles.inputField}
          type="text"
        />
        <img
          className={styles.inputBg}
          src="/icons/login/insert_nickname.webp"
          alt="nickname background"
        />
      </div>
    </div>

    <button className={styles.loginButton} onClick={handleLogin}>
  <img
    className={styles.loginImg}
    src="/icons/login/login_button.webp"
    alt="로그인 버튼"
  />
  <span className={styles.loginText}>로그인하기</span>
</button>
    <Link to="/signup" className={styles.signupLink}>
      회원가입
    </Link>
  </div>
</div>);
}