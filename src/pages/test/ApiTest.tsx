import { useState } from 'react';
// import styles from './ApiTest.module.css';
import { useToastStore } from '@/store/toast';
import { useAuthStore } from '@/store/auth';
import { useNavigate } from 'react-router-dom';

import { login, signup, updateUser, logout } from '@/lib/api/user';
import {
  sendLetter,
  getRandomLetters,
  getLetterDetail,
  getReplyOptions,
  replyToLetter,
  getRepliedLetters,
  getLetterComments,
  getSavedLetters,
} from '@/lib/api/letter';
import { getMyItems, getItemDetail, useItem, unuseItem } from '@/lib/api/item';
import { generateQuestion, getHelpQuestion } from '@/lib/api/question';
import { grantReward, getMyReward } from '@/lib/api/reward';
import { isErrorResponse } from '@/lib/response_dto';
import { GenderType } from '@/lib/type/user.type';
import { EmotionType, SendType } from '@/lib/type/letter.type';
import { ActionType } from '@/lib/type/reward.type';

export default function ApiTestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastStore();
  const { setLogout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setLogout();
    showToast('로그아웃되었습니다.');
    navigate('/signin', { replace: true });
  };

  const handleApiCall = async (apiCall: () => Promise<any>, sampleData?: any) => {
    setIsLoading(true);

    const result = await apiCall();
    if (isErrorResponse(result)) showToast(result.error);
    else if (result?.message) showToast(result.message);

    setIsLoading(false);
  };

  // 샘플 데이터
  const sampleData = {
    user: {
      signup: {
        nickname: 'master01',
        age: 25,
        gender: GenderType.MALE,
        address: '서울시 강남구',
        phone: '010-1234-5678',
      },
      login: {
        nickname: 'master01',
      },
      update: {
        nickname: '수정된닉네임',
        address: '서울시 서초구',
        phone: '010-8765-4321',
      },
    },
    letter: {
      send: {
        from: '보내는사람',
        to: SendType.SELF,
        title: '테스트 편지',
        content: '안녕하세요, 테스트 편지입니다.',
        emotion: EmotionType.EXCITED,
      },
      reply: {
        letter_id: '6826aaaaffff000000000013',
        content: '답장 테스트입니다.',
        reply: '답장 내용입니다.',
      },
    },
    item: {
      use: {
        item_id: '6824778b33b3799bb8c13001',
      },
    },
    question: {
      generate: {
        emotion: EmotionType.EXCITED,
      },
      help: {
        content: '도움이 필요해요',
        partial_letter: '편지 내용의 일부입니다.',
      },
    },
    reward: {
      grant: {
        action: ActionType.WRITE,
        amount: 100,
      },
    },
  };

  return (
    <div>
      <h1>API 테스트 페이지</h1>
      <button onClick={handleLogout}>로그아웃</button>

      <section>
        <h2>User API</h2>
        <div>
          <button
            onClick={() => handleApiCall(() => signup(sampleData.user.signup))}
            disabled={isLoading}
          >
            회원가입
          </button>
          <button
            onClick={() => handleApiCall(() => login(sampleData.user.login))}
            disabled={isLoading}
          >
            로그인
          </button>
          <button
            onClick={() => handleApiCall(() => updateUser(sampleData.user.update))}
            disabled={isLoading}
          >
            회원정보 수정
          </button>
        </div>
      </section>

      <section>
        <h2>Letter API</h2>
        <div>
          <button
            onClick={() => handleApiCall(() => sendLetter(sampleData.letter.send))}
            disabled={isLoading}
          >
            편지 보내기
          </button>
          <button onClick={() => handleApiCall(() => getRandomLetters())} disabled={isLoading}>
            랜덤 편지 조회
          </button>
          <button
            onClick={() => handleApiCall(() => getLetterDetail('6826aaaaffff000000000013'))}
            disabled={isLoading}
          >
            편지 상세 조회
          </button>
          <button
            onClick={() => handleApiCall(() => getReplyOptions('6826aaaaffff000000000013'))}
            disabled={isLoading}
          >
            답장 옵션 조회
          </button>
          <button
            onClick={() => handleApiCall(() => replyToLetter(sampleData.letter.reply))}
            disabled={isLoading}
          >
            답장하기
          </button>
          <button onClick={() => handleApiCall(() => getRepliedLetters())} disabled={isLoading}>
            받은 답장 조회
          </button>
          <button
            onClick={() =>
              handleApiCall(() => getLetterComments('d56cd6c2-993e-4957-adbe-12e325547582'))
            }
            disabled={isLoading}
          >
            편지 댓글 조회
          </button>
          <button onClick={() => handleApiCall(() => getSavedLetters())} disabled={isLoading}>
            저장된 편지 조회
          </button>
        </div>
      </section>

      <section>
        <h2>Item API</h2>
        <div>
          <button onClick={() => handleApiCall(() => getMyItems())} disabled={isLoading}>
            내 아이템 조회
          </button>
          <button
            onClick={() => handleApiCall(() => getItemDetail('6824778b33b3799bb8c13001'))}
            disabled={isLoading}
          >
            아이템 상세 조회
          </button>
          <button
            onClick={() => handleApiCall(() => useItem(sampleData.item.use))}
            disabled={isLoading}
          >
            아이템 사용
          </button>
          <button
            onClick={() => handleApiCall(() => unuseItem(sampleData.item.use))}
            disabled={isLoading}
          >
            아이템 사용 취소
          </button>
        </div>
      </section>

      <section>
        <h2>Question API</h2>
        <div>
          <button
            onClick={() => handleApiCall(() => generateQuestion(sampleData.question.generate))}
            disabled={isLoading}
          >
            질문 생성
          </button>
          <button
            onClick={() => handleApiCall(() => getHelpQuestion(sampleData.question.help))}
            disabled={isLoading}
          >
            도움말 질문
          </button>
        </div>
      </section>

      <section>
        <h2>Reward API</h2>
        <div>
          <button
            onClick={() => handleApiCall(() => grantReward(sampleData.reward.grant))}
            disabled={isLoading}
          >
            보상 지급
          </button>
          <button onClick={() => handleApiCall(() => getMyReward())} disabled={isLoading}>
            보상 히스토리
          </button>
        </div>
      </section>
    </div>
  );
}
