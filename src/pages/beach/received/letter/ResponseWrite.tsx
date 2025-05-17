import { useState, useEffect } from 'react';
import Appbar from '@/components/Appbar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import LetterWriteForm from '@/components/LetterWriteForm';
import styles from './responsewrite.module.css';
import SpeechModal from '@/pages/post/send/components/SpeechModal';
import { useToastStore } from '@/store/toast';
import { replyToLetter, getReplyOptions } from '@/lib/api/letter';
import { isErrorResponse, isSuccessResponse } from '@/lib/response_dto';
import { ActionType } from '@/lib/type/reward.type';
import { grantReward } from '@/lib/api/reward';
import StopWriteModal from '@/pages/post/send/components/StopWriteModal';
import CompleteWriteModal from '@/pages/post/send/components/CompleteWriteModal';
import { LetterDetail } from '@/lib/type/letter.type';

export default function ResponseWritePage() {
  const nextButtonIcon = (
    <img
      src="/image/write/otter_help.webp"
      alt="question"
      object-fit="cover"
      style={{ width: 'auto', height: '100%' }}
    />
  );

  const { letterId } = useParams();

  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastStore();

  const [openSpeech, setOpenSpeech] = useState(false);
  const [openStopWrite, setOpenStopWrite] = useState(false);
  const [openCompleteWrite, setOpenCompleteWrite] = useState(false);

  const location = useLocation();
  const state = location.state as { letter: LetterDetail };
  const [letter, setLetter] = useState<LetterDetail>(state?.letter || {});

  const [helpMessages, setHelpMessages] = useState<string[]>([]);

  const handleReply = async () => {
    if (!letterId) {
      showToast('존재하지 않는 편지입니다.');
      return;
    }

    if (content.length == 0) {
      console.log('content', content);
      showToast('작성한 내용이 없습니다.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await replyToLetter({
        letter_id: letterId,
        reply: content,
      });

      if (!response) {
        showToast('알 수 없는 오류가 발생했습니다.');
        return;
      }

      if (isErrorResponse(response)) {
        showToast(response.error);
        return;
      }

      // 보상 지급
      const rewardResponse = await grantReward({ action: ActionType.REPLY });

      if (isErrorResponse(rewardResponse)) {
        showToast(rewardResponse.error);
        return;
      }

      if (isSuccessResponse(rewardResponse)) {
        showToast('편지가 전송되었습니다.');
        navigate(`/received/letters/${letterId}/complete`, {
          state: {
            message: rewardResponse.message,
            leveled_up: rewardResponse.leveled_up,
            rewardItems: rewardResponse.new_items,
          },
        });
      }
    } catch (error) {
      showToast('편지 전송 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
      setOpenCompleteWrite(false);
    }
  };

  const fetchReplyOptions = async () => {
    if (!letterId || helpMessages.length > 0) return;

    const response = await getReplyOptions(letterId);

    if (isErrorResponse(response)) {
      showToast(response.error);
      return;
    }

    setHelpMessages(response.questions);
  };

  useEffect(() => {
    if (openSpeech) {
      fetchReplyOptions();
    }
  }, [openSpeech]);

  return (
    <div className={styles.page}>
      {openSpeech && (
        <SpeechModal
          onClose={() => setOpenSpeech(false)}
          type="reply"
          helpMessages={helpMessages}
          onRefresh={() => {}}
        />
      )}
      {openStopWrite && <StopWriteModal onClose={() => setOpenStopWrite(false)} type="reply" />}
      {openCompleteWrite && (
        <CompleteWriteModal
          onClose={() => setOpenCompleteWrite(false)}
          onConfirm={handleReply}
          isLoading={isLoading}
          type="reply"
        />
      )}
      <Appbar
        title="답장하기"
        onBackPress={() => setOpenStopWrite(true)}
        nextButtonIcon={nextButtonIcon}
        onNextPress={() => setOpenSpeech(true)}
      />
      <div className={styles.container}>
        <div className={styles.letterSection}>
          <p className={styles.date}>{letter.created_at}</p>
          <h2 className={styles.title}>{letter.title}</h2>
          <p className={styles.content}>{letter.content}</p>
        </div>

        <div className={styles.divider} />

        <div className={styles.writeSection}>
          <LetterWriteForm content={content} onChange={setContent} disabled={isLoading} />
          <button
            className={styles.submitButton}
            onClick={() => setOpenCompleteWrite(true)}
            disabled={isLoading || content.length < 10}
          >
            {isLoading ? '전송 중...' : '답장 보내기'}
          </button>
        </div>
      </div>
    </div>
  );
}
