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
      <div className={styles.container}>
        <Appbar title="" />
        <h2 className={styles.title}>누구에게 편지를 전하고 싶나요?</h2>
        <div className={styles.buttonContainer}>
          <button className={styles.shareButton} onClick={handleSave}>
            <img
              className={styles.buttonImage}
              src="/image/post/paper_archive_love.webp"
              object-fit="cover"
              alt="save"
            />
            <div className={styles.text}>나만의 보관함에 담기</div>
          </button>
          <button className={styles.shareButton} onClick={handleRandom}>
            <img
              className={styles.buttonImage}
              src="/image/common/paper_boat.webp"
              object-fit="cover"
              alt="random"
            />
            <div className={styles.text}>바다에 띄우기</div>
          </button>
          <button className={styles.shareButton} onClick={handleSend}>
            <img
              className={styles.buttonImage}
              src="/image/post/post_box.webp"
              object-fit="cover"
              alt="send"
            />

            <div className={styles.text}>온기 우체부에게 보내기</div>
          </button>
        </div>
      </div>
    </>
  );
}
