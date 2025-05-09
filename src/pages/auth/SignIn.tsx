import { useAuthStore } from '@/store/auth';
import { Link, replace, useNavigate } from 'react-router-dom';
import styles from './auth.module.css';

export default function SignInPage() {
  const navigate = useNavigate();
  const { isAuth, login } = useAuthStore();

  const handleLogin = () => {
    console.log('Login button clicked');

    // Handle login logic here

    console.log('Login successful');
    login();
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.container}>
      <h1>마음의 항해</h1>
      <img className={styles.logo} src="https://placehold.co/400x400" alt="" />
      <input className={styles.nicknameInput} type="text" placeholder="닉네임" />
      <button className={styles.loginButton} onClick={handleLogin}>
        로그인
      </button>
      <Link to="/signup">회원가입</Link>
    </div>
  );
}
