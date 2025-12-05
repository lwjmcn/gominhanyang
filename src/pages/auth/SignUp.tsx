import { Link, useNavigate } from 'react-router-dom';
import styles from './auth.module.css';
import { useToastStore } from '@/store/toast';
import { useState, useEffect } from 'react';
import { signup } from '@/lib/api/user';
import { sendVerificationCode, verifyCode } from '@/lib/api/email';
import { GenderType, JobType } from '@/lib/type/user.type';
import { isErrorResponse } from '@/lib/response_dto';
import { useAuthStore } from '@/store/auth';
import ReactGA from 'react-ga4';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useAudioStore } from '@/store/audio';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const { audioOn, toggleAudio } = useAudioStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [emailCode, setEmailCode] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailVerificationToken, setEmailVerificationToken] = useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [emailNotifyEnabled, setEmailNotifyEnabled] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    gender: GenderType.OTHER,
    age: undefined,
    status: JobType.UNEMPLOYED,
    email: '',
    password: '',
    address: '',
    phone: '',
    email_notify_enabled: false,
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

    // reset email-related status when email input changes
    if (name === 'email') {
      setCooldownSeconds(0);
      setEmailVerified(false);
      setEmailVerificationToken(null);
    }
  };

  const handleSendVerificationCode = async () => {
    const email = String(formData.email || '')
      .trim()
      .toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('유효한 이메일을 입력해주세요.');
      return;
    }

    try {
      setIsSendingCode(true);
      const response = await sendVerificationCode({ email });
      if (!response) {
        showToast('인증 메일 발송 중 오류가 발생했습니다.');
        return;
      } else if (isErrorResponse(response)) {
        showToast(response.error);
        // if server returns retry_after info, it may be included in message - not standardized here
        return;
      }

      showToast(response.message || '인증 메일이 발송되었습니다. 이메일의 인증코드를 확인하세요.');
      setCooldownSeconds(60); // 60초 재전송 쿨타임
    } catch (e: any) {
      showToast('인증 메일 발송 중 오류가 발생했습니다.');
    } finally {
      setIsSendingCode(false);
    }
  };
  // cooldown timer for resend
  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const t = setInterval(() => {
      setCooldownSeconds(s => {
        if (s <= 1) {
          clearInterval(t);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [cooldownSeconds]);

  const verifyEmailCode = async () => {
    if (!emailCode) {
      showToast('인증코드를 입력해주세요.');
      return;
    }

    try {
      setIsVerifyingCode(true);
      const email = String(formData.email || '')
        .trim()
        .toLowerCase();
      const response = await verifyCode({ email, code: emailCode });
      if (!response) {
        showToast('인증 실패: 응답이 없습니다.');
        return;
      } else if (isErrorResponse(response)) {
        showToast(response.error);
        return;
      }

      // success -> store token
      const token = response.email_verification_token;
      setEmailVerificationToken(token);
      setEmailVerified(true);
      showToast(response.message || '이메일 인증이 완료되었습니다.');
    } catch (e: any) {
      showToast('인증코드 확인 중 오류가 발생했습니다.');
    } finally {
      setIsVerifyingCode(false);
    }
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
    } else if (!emailVerified || !emailVerificationToken) {
      showToast('이메일 인증을 완료해주세요.');
      return;
    } else setIsLoading(true);

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
        email_verification_token: emailVerificationToken,
        email_notify_enabled: formData.email_notify_enabled,
      });
      // TODO: email 인증코드 검증 로직 추가

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

      navigate('/', { replace: true });
    } catch (error) {
      showToast('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => toggleAudio()}
        title={audioOn ? '사운드 끄기' : '사운드 켜기'}
        aria-label={audioOn ? '음소거' : '소리 켬'}
        className={styles.audioToggleButton}
      >
        {audioOn ? (
          <img src="/image/login_setting/music_note.svg" alt="Sound On" />
        ) : (
          <img src="/image/login_setting/music_off.svg" alt="Sound Off" />
        )}
      </button>
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
          <div className={styles.verifyRow}>
            <input
              className={styles.input}
              name="email"
              type="email"
              placeholder="example@domain.com"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <button
              type="button"
              className={styles.smallButton}
              onClick={handleSendVerificationCode}
              disabled={isSendingCode || isLoading || cooldownSeconds > 0}
            >
              {isSendingCode ? <LoadingSpinner spinnerSize={2} /> : '인증'}
            </button>
          </div>
        </div>

        <div className={styles.labelContainer}>
          <div className={styles.verifyRow}>
            <input
              className={styles.input}
              name="emailCode"
              type="text"
              placeholder="인증코드 입력"
              value={emailCode}
              onChange={e => setEmailCode(e.target.value)}
              disabled={emailVerified || isLoading}
            />
            <button
              type="button"
              className={styles.smallButton}
              onClick={verifyEmailCode}
              disabled={emailVerified || isVerifyingCode || isLoading}
            >
              {isVerifyingCode ? <LoadingSpinner spinnerSize={2} /> : '확인'}
            </button>
          </div>
        </div>

        <div className={styles.labelContainer}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={emailNotifyEnabled}
              onChange={e => setEmailNotifyEnabled(e.target.checked)}
            />
            <span>
              편지나 답장을 수신했을 때 알림을 받아보실래요?{' '}
              <small style={{ color: '#8b7f7a' }}>(권장)</small>
            </span>
          </label>
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
