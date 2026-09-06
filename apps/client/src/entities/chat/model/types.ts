export type ChatRoleType = 'user' | 'bot';

export type ChatFinishReasonType = 'stop' | 'length';

export type ChatFailReasonType =
  | 'unauthorized'
  | 'session_expired'
  | 'rate_limited'
  | 'bad_request'
  | 'upstream_interrupted'
  | 'idle_timeout'
  | 'connection_lost';

export type ChatMessageStatusType = 'streaming' | 'done' | 'truncated' | 'failed';

export interface ChatMessageType {
  id: string;
  role: ChatRoleType;
  content: string;
  status?: ChatMessageStatusType;
  failReason?: ChatFailReasonType;
  /** 봇 메시지가 어떤 질문에 대한 답변인지 — 재시도 시 그 질문만 다시 보낸다 */
  question?: string;
}

export interface ChatSessionType {
  sessionId: string;
}
