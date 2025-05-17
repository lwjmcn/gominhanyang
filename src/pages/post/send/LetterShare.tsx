import Appbar from '@/components/Appbar';
import styles from './lettershare.module.css';
import { useNavigate } from 'react-router-dom';
import { SendType } from '@/lib/type/letter.type';

export default function LetterSharePage() {
  const navigate = useNavigate();
  const handleNextPage = (type: string) => {
    navigate('/letter/write', { state: { sendType: type } });
  };

  const handleSave = () => {
    // handle save logic here

    console.log('Saved to my collection!');
    handleNextPage(SendType.SELF);
  };

  const handleRandom = () => {
    // handle random logic here

    console.log('Sent to the sea!');
    handleNextPage(SendType.RANDOM);
  };

  const handleSend = () => {
    // handle send logic here

    console.log('Sent to 온기우체부!');
    handleNextPage(SendType.VOLUNTEER);
  };

  return (
    <>
      <Appbar title="" />
      <div className={styles.container}>
        <h2>편지를 누구에게 띄울까요?</h2>
        <button className={styles.shareButton} onClick={handleSave}>
          <img
            className={styles.buttonImage}
            src="/image/post/paper_archive_love.webp"
            object-fit="cover"
            alt="save"
          />
          나만의 보관함에 담기
        </button>
        <button className={styles.shareButton} onClick={handleRandom}>
          <img
            className={styles.buttonImage}
            src="/image/common/paper_boat.webp"
            object-fit="cover"
            alt="random"
          />
          바다에 띄우기
        </button>
        <button className={styles.shareButton} onClick={handleSend}>
          <img
            className={styles.buttonImage}
            src="/image/post/post_box.webp"
            object-fit="cover"
            alt="send"
          />
          온기 우체부에게 보내기
        </button>
      </div>
    </>
  );
}
