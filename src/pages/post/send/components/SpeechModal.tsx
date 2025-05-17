import { useEffect, useState } from 'react';
import styles from './speechmodal.module.css';
import { getReplyOptions } from '@/lib/api/letter';
import { isErrorResponse } from '@/lib/response_dto';
import { useToastStore } from '@/store/toast';
import { generateQuestion, getHelpQuestion } from '@/lib/api/question';
import { EmotionType } from '@/lib/type/letter.type';

interface SpeechModalProps {
  onClose?: () => void;
  type: 'letter' | 'reply';
  letterId?: string;
  emotion?: EmotionType;
  partialLetter?: string;
}

export default function SpeechModal({
  onClose,
  type,
  letterId,
  emotion,
  partialLetter,
}: SpeechModalProps) {
  const [helpMessages, setHelpMessages] = useState<string[]>([]);
  const handleRefresh = () => {};

  const fetchInitialQuestion = async () => {
    if (!emotion) return;
    const response = await generateQuestion({ emotion });

    if (isErrorResponse(response)) {
      showToast(response.error);
      return;
    }

    setHelpMessages([response.question]);
  };
  const updateQuestion = async () => {
    if (!partialLetter) return;

    const response = await getHelpQuestion({ partial_letter: partialLetter });

    if (isErrorResponse(response)) {
      showToast(response.error);
      return;
    }

    setHelpMessages([response.help_question]);
  };

  const fetchReplyOptions = async () => {
    if (!letterId) return;

    const response = await getReplyOptions(letterId);

    if (isErrorResponse(response)) {
      showToast(response.error);
      return;
    }

    setHelpMessages(response.questions);
  };

  useEffect(() => {
    if (type === 'letter') fetchInitialQuestion();
    else if (type === 'reply') fetchReplyOptions();
  }, [type]);

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖️
        </button>
        <div>
          {helpMessages.map((msg, index) => (
            <p key={`msg-${index}`}>{msg}</p>
          ))}
        </div>
        <button className={styles.closeButton} onClick={handleRefresh}>
          🔃
        </button>
      </div>
    </div>
  );
}
function showToast(error: string) {
  throw new Error('Function not implemented.');
}
