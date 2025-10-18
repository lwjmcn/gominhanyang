import Appbar from '@/components/Appbar';
import styles from './lettershare.module.css';
import { useNavigate } from 'react-router-dom';
import { SendType } from '@/lib/type/letter.type';
import Caution from './components/Caution';
import { useToastStore } from '@/store/toast';

export default function LetterSharePage() {
  const { showToast } = useToastStore();
  const navigate = useNavigate();
  const handleNextPage = (type: string) => {
    if (type === SendType.VOLUNTEER) {
      showToast('아직 준비 중인 서비스예요!');
    } else navigate('/letter/emotion', { state: { sendType: type } });
  };

  return (
    <div className={styles.pageBackground}>
      <Appbar title="" />
      <div className={styles.container}>
        <p className={styles.title}>누구에게 편지를 전하고 싶나요?</p>

        <div className={styles.buttonContainer}>
          <button className={styles.shareButton} onClick={() => handleNextPage(SendType.SELF)}>
            <img
              className={styles.buttonImage}
              src="/image/post/paper_archive_love.webp"
              object-fit="cover"
              alt="save"
            />
            <div className={styles.text}>나만의 보관함에 간직하기</div>
          </button>
          <button className={styles.shareButton} onClick={() => handleNextPage(SendType.RANDOM)}>
            <img
              className={styles.buttonImage}
              src="/image/beach/paperboat.webp"
              object-fit="cover"
              alt="random"
            />
            <div className={styles.text}>바다 위 익명 친구에게 띄우기</div>
          </button>
          <button className={styles.shareButton} onClick={() => handleNextPage(SendType.VOLUNTEER)}>
            <img
              className={styles.buttonImage}
              src="/image/post/post_box.webp"
              object-fit="cover"
              alt="send"
            />

            <div className={styles.text}>온기 우체부에게 전송하기</div>
          </button>
        </div>

        <Caution
          message={`⚠️ 편지 작성 시 유의사항\n타인에게 편지를 보낼 경우, 이름, 연락처, 주소 등 개인정보가 포함되지 않도록 주의해 주세요. 또한, 비난, 조롱, 위협 등 악의적인 내용은 절대 허용되지 않습니다.`}
        />
      </div>
    </div>
  );
}
