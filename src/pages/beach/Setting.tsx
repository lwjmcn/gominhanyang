import Appbar from '@/components/Appbar';
import styles from './setting.module.css';

export default function SettingPage() {
  return (
    <>
      <Appbar
        title={'설정'}
        nextButtonIcon={''}
        nextButtonText={''}
        onBackPress={() => {}}
        onNextPress={() => {}}
      />
      <div className={styles.container}>
        <input type="text" placeholder="닉네임" disabled />
        <p>성별</p>
        <p>나이대</p>
      </div>
    </>
  );
}
