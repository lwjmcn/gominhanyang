import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.css';
import styles2 from './signup.module.css';
import { useToastStore } from '@/store/toast';
import { signup } from '@/services/auth';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { setMessage, setShow } = useToastStore();

  const [form, setForm] = useState({
    nickname: '',
    gender: '',
    age: '',
    address: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const res = await signup({
        nickname: form.nickname,
        age: Number(form.age),
        gender: form.gender as '남성' | '여성',
        address: form.address,
        phone: form.phone,
      });

      console.log('✅ 회원가입 성공!', res);
      setMessage('가입이 완료되었습니다.');
      setShow(true);
      navigate('/signin');
    } catch (err) {
      alert('회원가입 실패 😢');
    }
  };

  return (
    <div className={styles.container}>
      <h2>회원가입</h2>

      <input
        className={styles.nicknameInput}
        type="text"
        placeholder="닉네임"
        name="nickname"
        onChange={handleChange}
      />

      <div className={styles2.genderAge}>
        <div className={styles2.genderContainer}>
          <p>성별</p>
          <div onChange={handleChange}>
            <input type="radio" id="남" name="gender" value="남성" />
            <label htmlFor="남">남</label>
            <input type="radio" id="여" name="gender" value="여성" />
            <label htmlFor="여">여</label>
          </div>
        </div>

        <div className={styles2.AgeContainer}>
          <p>나이대</p>
          <select name="age" onChange={handleChange}>
            <option value="">선택</option>
            <option value="10">10대</option>
            <option value="20">20대</option>
            <option value="30">30대</option>
            <option value="40">40대</option>
            <option value="50">50대</option>
            <option value="60">60대 이상</option>
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
