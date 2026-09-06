'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { getApiErrorStatus } from '@shared/api';

import { type ChatFailReasonType, type ChatMessageType, usePostChatSession } from '@/entities/chat';

import { askChat, toFailReason } from './askChat';

export const CHAT_MESSAGE_MAX_LENGTH = 500;

const CHAT_GREETING: ChatMessageType = {
  id: 'greeting',
  role: 'bot',
  status: 'done',
  content:
    '안녕하세요! Ready, GSM 챗봇이에요.\n학과 체험이나 입학설명회에 대해 궁금한 점을 물어보세요.',
};

type SessionResultType =
  | { ok: true; sessionId: string }
  | { ok: false; reason: ChatFailReasonType };

interface UseChatStreamOptions {
  onUnauthorized: () => void;
}

export const useChatStream = ({ onUnauthorized }: UseChatStreamOptions) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([CHAT_GREETING]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  /**
   * 세션은 메모리에만 둔다. 대화 이력 조회 API가 없어서, 세션을 새로고침 너머로
   * 복원하면 서버는 이전 대화를 기억하는데 화면은 비어 있는 상태가 된다.
   * 화면의 대화와 서버의 세션이 항상 같은 수명을 갖도록 맞춘다.
   */
  const sessionIdRef = useRef<string | null>(null);
  const isAbortedRef = useRef(false);
  /** 같은 틱에 두 번 호출되면 isStreaming 스냅샷으로는 막지 못한다 */
  const isStreamingRef = useRef(false);
  const { mutateAsync: issueSession } = usePostChatSession();

  const updateMessage = useCallback((id: string, patch: Partial<ChatMessageType>) => {
    setMessages((prev) =>
      prev.map((message) => (message.id === id ? { ...message, ...patch } : message)),
    );
  }, []);

  const createSession = useCallback(async (): Promise<SessionResultType> => {
    try {
      const res = await issueSession();
      const { sessionId } = res.data;
      sessionIdRef.current = sessionId;
      return { ok: true, sessionId };
    } catch (error) {
      const status = getApiErrorStatus(error);

      /** 세션 발급에는 만료시킬 세션이 없다 — 404는 재발급이 아니라 통신 실패로 본다 */
      if (status === undefined || status === 404) return { ok: false, reason: 'connection_lost' };

      const reason = toFailReason(status);
      return { ok: false, reason: reason === 'session_expired' ? 'connection_lost' : reason };
    }
  }, [issueSession]);

  const runStream = useCallback(
    async (question: string, botId: string) => {
      const controller = new AbortController();
      abortRef.current = controller;
      isAbortedRef.current = false;

      let sessionId: string;
      const current = sessionIdRef.current;

      if (current) {
        sessionId = current;
      } else {
        const created = await createSession();
        if (!created.ok) return created.reason;
        sessionId = created.sessionId;
      }

      const onToken = (token: string) =>
        setMessages((prev) =>
          prev.map((message) =>
            message.id === botId ? { ...message, content: message.content + token } : message,
          ),
        );

      const ask = () =>
        askChat({ sessionId, message: question, signal: controller.signal, onToken });

      let result = await ask();

      /** 세션이 만료됐거나 다른 사용자에게 묶인 경우 — 재발급 후 같은 질문을 한 번만 재시도한다 */
      if (result.type === 'fail' && result.reason === 'session_expired' && !isAbortedRef.current) {
        sessionIdRef.current = null;

        const reissued = await createSession();
        if (!reissued.ok) return reissued.reason;
        sessionId = reissued.sessionId;

        updateMessage(botId, { content: '' });
        result = await ask();
      }

      if (result.type === 'done') {
        updateMessage(botId, {
          status: result.finishReason === 'length' ? 'truncated' : 'done',
        });
        return null;
      }

      return result.reason;
    },
    [createSession, updateMessage],
  );

  const send = useCallback(
    async (question: string) => {
      if (isStreamingRef.current) return;

      const trimmed = question.trim();
      if (!trimmed || trimmed.length > CHAT_MESSAGE_MAX_LENGTH) return;

      const key = Date.now();
      const botId = `bot-${key}`;

      isStreamingRef.current = true;
      setMessages((prev) => [
        ...prev,
        { id: `user-${key}`, role: 'user', content: trimmed, status: 'done' },
        { id: botId, role: 'bot', content: '', status: 'streaming', question: trimmed },
      ]);
      setIsStreaming(true);

      const failReason = await runStream(trimmed, botId);

      isStreamingRef.current = false;
      setIsStreaming(false);
      abortRef.current = null;

      /** 사용자가 직접 중단한 경우는 실패가 아니다 — 받은 답변만 남긴다 */
      if (isAbortedRef.current) {
        updateMessage(botId, { status: 'done' });
        return;
      }

      if (failReason) {
        updateMessage(botId, { status: 'failed', failReason });
        if (failReason === 'unauthorized') onUnauthorized();
      }
    },
    [onUnauthorized, runStream, updateMessage],
  );

  const abort = useCallback(() => {
    isAbortedRef.current = true;
    abortRef.current?.abort();
  }, []);

  const retry = useCallback(
    (botId: string) => {
      /** 상태를 건드리기 전에 막아야 한다 — 흘려보내면 진행 중인 답변까지 잘려나간다 */
      if (isStreamingRef.current) return;

      const index = messages.findIndex((message) => message.id === botId);
      const question = messages[index]?.question;

      /** 봇 메시지 바로 앞이 그 질문이다. 0번은 항상 인사말이라 index는 1 이상이다 */
      if (index < 1 || !question) return;

      /**
       * 실패한 질문·답변 쌍만 들어내고 같은 질문을 맨 뒤로 다시 보낸다.
       * 뒤쪽을 통째로 자르면 그 사이에 성공한 대화까지 사라진다.
       */
      setMessages((prev) => [...prev.slice(0, index - 1), ...prev.slice(index + 1)]);
      send(question);
    },
    [messages, send],
  );

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  return { messages, isStreaming, send, abort, retry };
};
