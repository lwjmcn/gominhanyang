import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.css';
import styles2 from './signup.module.css';
import { useToastStore } from '@/store/toast';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { setMessage, setShow } = useToastStore();

  const handleSignup = () => {
    console.log('signup button clicked');

    // Handle signup logic here

    console.log('signup successful');

    setMessage('가입이 완료되었습니다.');
    setShow(true);
    navigate('/signin');
  };
  return (
    <div className={styles.container}>
      <h2>회원가입</h2>
      <input className={styles.nicknameInput} type="text" placeholder="닉네임" />
      <div className={styles2.genderAge}>
        <div className={styles2.genderContainer}>
          <p>성별</p>
          <div>
            <input type="radio" value="남" />
            <label>남</label>
            <input type="radio" value="여" />
            <label>여</label>
            <input type="radio" value="기타" />
            <label>기타</label>
          </div>
        </div>
        <div className={styles2.AgeContainer}>
          <p>나이대</p>
          <select>
            <option value="10대">10대</option>
            <option value="20대">20대</option>
            <option value="30대">30대</option>
            <option value="40대">40대</option>
            <option value="50대">50대</option>
            <option value="60대 이상">60대 이상</option>
          </select>
        </div>
      </div>
      <button className={styles.loginButton} onClick={handleSignup}>
        가입하기
      </button>
      <Link to="/signin">로그인</Link>
    </div>
  );
}
