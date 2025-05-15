import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './auth.module.css';
import styles2 from './signup.module.css';
import { useToastStore } from '@/store/toast';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { setMessage, setShow } = useToastStore();

  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState<'남' | '여'>('남');
  const [age, setAge] = useState('');

  const handleSignup = () => {
    // 여기에 실제 signup 처리 로직 추가 가능
    console.log('✅ 회원가입:', { nickname, gender, age });
    setMessage('가입이 완료되었습니다.');
    setShow(true);
    navigate('/signin');
  };

  return (
    <div className={styles2.container}>
      <button className={styles2.backButton} onClick={() => navigate(-1)}>
        <img src="/icons/login/back_arrow.webp" alt="뒤로가기" />
      </button>

      <h2 className={styles2.title}>회원가입</h2>

      <p className={styles2.label}>닉네임(ID)</p>
      <img src="/icons/login/insert_nickname.webp" alt="닉네임 입력창" className={styles2.nicknameInput} />

      <div className={styles2.row}>
        {/* 성별 */}
        <div className={styles2.genderBox}>
          <p className={styles2.label}>성별</p>
          <div className={styles2.genderBtns}>
            <img
              src={
                gender === '남'
                  ? '/icons/login/sexuality_selected.webp'
                  : '/icons/login/sexuality_unselected.webp'
              }
              alt="남"
              onClick={() => setGender('남')}
              className={styles2.genderIcon}
            />
            <span>남</span>
            <img
              src={
                gender === '여'
                  ? '/icons/login/sexuality_selected.webp'
                  : '/icons/login/sexuality_unselected.webp'
              }
              alt="여"
              onClick={() => setGender('여')}
              className={styles2.genderIcon}
            />
            <span>여</span>
          </div>
        </div>

        {/* 나이대 */}
        <div className={styles2.ageBox}>
          <p className={styles2.label}>나이대</p>
          <img src="/icons/login/goback.webp" alt="화살표" className={styles2.arrow} />
          <img src="/icons/login/insert_age.webp" alt="나이대 버튼" className={styles2.ageBtn} />
        </div>
      </div>

      <button className={styles2.signupButton} onClick={handleSignup}>
        가입하기
      </button>

      <Link to="/signin" className={styles2.loginLink}>로그인</Link>
    </div>
  );
}

