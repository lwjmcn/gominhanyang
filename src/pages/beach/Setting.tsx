import Appbar from '@/components/Appbar';
import styles from './setting.module.css';
import { useState } from 'react';

export default function SettingPage() {
  const [gender, setGender] = useState<'남' | '여'>('남');

  return (
    <div className={styles.container}>
      <button className={styles.backButton}>
        <img src="/icons/goback.webp" alt="뒤로가기" />
      </button>

      <div className={styles.innerBox}>
        <h1 className={styles.title}>설정</h1>

        <p className={styles.label}>닉네임(ID)</p>
        <img
          src="/icons/login/insert_nickname.webp"
          alt="닉네임 입력"
          className={styles.nicknameInput}
        />

        <div className={styles.row}>
          {/* 성별 */}
          <div className={styles.genderBox}>
            <p className={styles.label}>성별</p>
            <div className={styles.genderBtns}>
              <img
                src={
                  gender === '남'
                    ? '/icons/login/sexuality_selected.webp'
                    : '/icons/login/sexuality_unselected.webp'
                }
                alt="남"
                className={styles.genderIcon}
                onClick={() => setGender('남')}
              />
              <span>남</span>
              <img
                src={
                  gender === '여'
                    ? '/icons/login/sexuality_selected.webp'
                    : '/icons/login/sexuality_unselected.webp'
                }
                alt="여"
                className={styles.genderIcon}
                onClick={() => setGender('여')}
              />
              <span>여</span>
            </div>
          </div>

          {/* 나이대 */}
          <div className={styles.ageBox}>
            <p className={styles.label}>나이대</p>
            <img src="/icons/login/age_arrow.webp" alt="arrow" className={styles.arrow} />
            <img src="/icons/login/insert_age.webp" alt="나이대 버튼" className={styles.ageBtn} />
          </div>
        </div>
      </div>
    </div>
  );
}
