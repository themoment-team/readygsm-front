import type { ChatFailReasonType } from '@/entities/chat';

/** 서버 오류 본문의 message는 한국어/영어가 섞이므로 화면 문구는 프론트에서 만든다 */
export const CHAT_FAIL_MESSAGE: Record<ChatFailReasonType, string> = {
  unauthorized: '로그인이 만료되었어요. 다시 로그인해주세요.',
  session_expired: '대화가 만료되었어요. 다시 시도해주세요.',
  rate_limited: '지금 문의가 몰리고 있어요. 잠시 후 다시 시도해주세요.',
  bad_request: '질문을 보내지 못했어요. 다시 시도해주세요.',
  upstream_interrupted: '답변이 중간에 끊겼어요.',
  idle_timeout: '답변이 중간에 끊겼어요.',
  connection_lost: '답변이 중간에 끊겼어요.',
};
