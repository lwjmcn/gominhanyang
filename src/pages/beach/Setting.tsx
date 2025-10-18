import Appbar from '@/components/Appbar';
import styles from './setting.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GenderType, JobType } from '@/lib/type/user.type';
import { useToastStore } from '@/store/toast';
import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/user';
import { useAudioStore } from '@/store/audio';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function SettingPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const { setLogout } = useAuthStore();
  const { userInfo, isLoading, fetchUserInfo, updateUserInfo } = useUserStore();
  const { audioOn, setAudioOn } = useAudioStore();
  const [formData, setFormData] = useState({
    nickname: '',
    gender: GenderType.MALE,
    age: '',
    status: JobType.UNEMPLOYED,
    email: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    if (userInfo.nickname.length === 0)
      fetchUserInfo().catch(error => {
        showToast(error.message || '회원 정보 조회 중 오류가 발생했습니다.');
      });
  }, []);

  useEffect(() => {
    if (userInfo.nickname) {
      setFormData({
        ...userInfo,
        age: userInfo.age?.toString() || '',
      });
    }
  }, [userInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      showToast('유효한 이메일 주소를 입력해주세요');
      return;
    }

    try {
      await updateUserInfo({
        ...formData,
        age: parseInt(formData.age) || undefined,
      }).then(() => {
        fetchUserInfo();
      });
      showToast('회원 정보가 수정되었습니다.');
    } catch (error) {
      showToast(error instanceof Error ? error.message : '회원 정보 수정 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = () => {
    setLogout();
    navigate('/signin', { replace: true });
  };

  const handleMusicToggle = () => {
    setAudioOn(!audioOn);
  };

  return (
    <>
      <Appbar
        title={'설정'}
        nextButtonIcon={
          <img
            src="/image/common/help.svg"
            alt="Help"
            style={{ height: '70%', margin: '0 auto', objectFit: 'cover', opacity: '0.3' }}
          />
        }
        onBackPress={() => navigate(-1)}
        onNextPress={() => window.open('https://surl.lu/kokxkt', '_blank')}
      />
      <div className={styles.container}>
        {/* 내 정보 수정 섹션 */}
        <div className={`${styles.section} ${styles.profileSection}`}>
          <div className={styles.sectionTitle}>내 정보 수정</div>
          <div className={styles.labelContainer}>
            <label className={styles.label}>닉네임(ID)</label>
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
          <div className={styles.genderStatusRow}>
            <div className={styles.labelContainer}>
              <label className={styles.label}>성별 </label>
              <div className={styles.radioContainer}>
                <div className={styles.radioLabelContainer}>
                  <input
                    type="radio"
                    name="gender"
                    value={GenderType.MALE}
                    checked={formData.gender === GenderType.MALE}
                    onChange={handleInputChange}
                    disabled={true}
                    className={styles.radioInput}
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
                    disabled={true}
                    className={styles.radioInput}
                  />
                  <label className={styles.ageLabel}>여</label>
                </div>
              </div>
            </div>

            <div className={styles.labelContainer}>
              <label className={styles.label}>직업</label>
              <select
                className={styles.input}
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                disabled
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
            <label className={styles.label}>출생연도</label>
            <input
              className={styles.input}
              name="age"
              type="number"
              placeholder="출생연도 ex. 2006"
              value={formData.age}
              onChange={handleInputChange}
              disabled={true}
            />
          </div>
          <div className={styles.labelContainer}>
            <label className={styles.label}>이메일</label>
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
          <button className={styles.saveButton} onClick={handleUpdate} disabled={isLoading}>
            {isLoading ? <LoadingSpinner spinnerSize={2} /> : '저장하기'}
          </button>
          <button className={styles.logoutButton} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
        {/* 배경음악 섹션 */}
        <div className={`${styles.section} ${styles.bgmSection}`}>
          <div className={styles.sectionTitle}>기타 설정</div>
          <div className={styles.bgmRow}>
            <label style={{ fontSize: '2.5rem' }}>배경음악</label>
            <label className={styles.toggleSwitch}>
              <input type="checkbox" checked={audioOn} onChange={handleMusicToggle} />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
