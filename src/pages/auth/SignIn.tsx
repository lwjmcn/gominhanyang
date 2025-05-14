import { useAuthStore } from '@/store/auth';
import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.css';
import { login } from '@/lib/api/auth';
import { LoginResponseDto } from '@/lib/dto/user.response.dto';
import { ResponseBody } from '@/lib/response_dto';

export default function SignInPage() {
  const navigate = useNavigate();
  const { isAuth, setLogin } = useAuthStore();

  const handleLogin = async () => {
    console.log('Login button clicked');

    // TODO: LOGIN API NOT WORKING, CORS? 백엔드 확인 필요
    await login({ nickname: 'test' }).then((responseBody: ResponseBody<LoginResponseDto>) => {
      if (!responseBody) {
        console.log('Login error');
        return;
      }
      console.log('Login successful', responseBody);
      setLogin();
      navigate('/', { replace: true });
    });
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
