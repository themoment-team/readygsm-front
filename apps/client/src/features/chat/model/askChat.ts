import { type ChatFailReasonType, type ChatFinishReasonType, chatUrl } from '@/entities/chat';

/** axios 인스턴스의 baseURL과 동일한 프록시 경로 — 쿠키를 same-origin으로 실어 보내기 위함 */
const API_PROXY_PREFIX = '/api';

const FRAME_DELIMITER = '\n\n';

export type AskChatResultType =
  | { type: 'done'; finishReason: ChatFinishReasonType }
  | { type: 'fail'; reason: ChatFailReasonType };

interface AskChatOptions {
  sessionId: string;
  message: string;
  signal: AbortSignal;
  onToken: (token: string) => void;
}

export const toFailReason = (status: number): ChatFailReasonType => {
  /**
   * 403은 로그인 자체가 없는 경우다. 세션 발급도 로그인을 요구하므로
   * 재발급으로는 복구되지 않는다 — 로그인 플로우로 보내야 한다.
   * 만료·미존재·남의 세션은 서버가 전부 404로 통일해서 내려준다.
   */
  if (status === 401 || status === 403) return 'unauthorized';
  if (status === 404) return 'session_expired';
  if (status === 429) return 'rate_limited';
  return 'bad_request';
};

/** event: error의 data는 {"reason":"..."} 형태 — 모르는 값은 중단으로 뭉뚱그린다 */
const toErrorEventReason = (data: string): ChatFailReasonType => {
  try {
    return JSON.parse(data).reason === 'idle_timeout' ? 'idle_timeout' : 'upstream_interrupted';
  } catch {
    return 'upstream_interrupted';
  }
};

/**
 * 토큰은 이미 다 받은 뒤에 오는 프레임이라, 여기서 파싱이 깨져도 실패로 뒤집지 않는다.
 * data 줄이 없거나 JSON이 아니면 정상 종료로 본다.
 */
const toFinishReason = (data: string): ChatFinishReasonType => {
  try {
    return JSON.parse(data).finishReason === 'length' ? 'length' : 'stop';
  } catch {
    return 'stop';
  }
};

interface ParsedFrame {
  event: string;
  data: string;
  hasData: boolean;
}

const parseFrame = (frame: string): ParsedFrame => {
  let event = 'message';
  const dataLines: string[] = [];

  for (const line of frame.split('\n')) {
    /** ':'로 시작하는 줄은 15초 heartbeat(: ping) — data로 오인하면 빈 조각이 섞인다 */
    if (line.startsWith(':')) continue;

    if (line.startsWith('event:')) {
      event = line.slice(6).trim();
      continue;
    }

    /**
     * SSE 명세와 달리 선행 공백을 벗기지 않는다.
     * 서버가 'data:' 뒤에 공백을 넣지 않아, 벗기면 토큰 자체의 공백이 사라진다.
     */
    if (line.startsWith('data:')) dataLines.push(line.slice(5));
  }

  /** 토큰에 줄바꿈이 있으면 서버가 data: 줄을 여러 개로 쪼개 보낸다 */
  return { event, data: dataLines.join('\n'), hasData: dataLines.length > 0 };
};

/** 프레임 하나를 처리한다 — 종료 프레임이면 결과를, 그 외에는 null을 돌려준다 */
const consumeFrame = (
  frame: string,
  onToken: (token: string) => void,
): AskChatResultType | null => {
  const { event, data, hasData } = parseFrame(frame);

  if (event === 'done') return { type: 'done', finishReason: toFinishReason(data) };
  if (event === 'error') return { type: 'fail', reason: toErrorEventReason(data) };

  /** heartbeat(: ping)만 담긴 프레임은 data 줄이 없다 — 토큰으로 취급하지 않는다 */
  if (event === 'message' && hasData) onToken(data);

  return null;
};

export const askChat = async ({
  sessionId,
  message,
  signal,
  onToken,
}: AskChatOptions): Promise<AskChatResultType> => {
  let res: Response;

  try {
    res = await fetch(`${API_PROXY_PREFIX}${chatUrl.postChat()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
        'X-Session-Id': sessionId,
      },
      body: JSON.stringify({ message }),
      credentials: 'include',
      signal,
    });
  } catch {
    return { type: 'fail', reason: 'connection_lost' };
  }

  /** 200이 아니면 SSE가 아니라 JSON 오류 본문이다 */
  if (!res.ok) return { type: 'fail', reason: toFailReason(res.status) };
  if (!res.body) return { type: 'fail', reason: 'connection_lost' };

  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = '';
  let result: AskChatResultType | null = null;
  /** 청크 경계에 CRLF가 걸리면 '\r'만 먼저 도착한다 — 짝을 볼 때까지 붙이지 않는다 */
  let pendingCR = false;

  try {
    while (!result) {
      const { value, done } = await reader.read();

      if (done) {
        /** 서버가 마지막 프레임 뒤 빈 줄 없이 닫는 경우 — 남은 버퍼를 버리지 않는다 */
        if (pendingCR) buffer += '\n';
        if (buffer.trim()) result = consumeFrame(buffer, onToken);
        break;
      }

      /** 명세는 CRLF·LF·CR을 모두 허용한다 — LF로 통일해야 프레임 경계를 찾을 수 있다 */
      let chunk: string = pendingCR ? `\r${value}` : value;
      pendingCR = chunk.endsWith('\r');
      if (pendingCR) chunk = chunk.slice(0, -1);

      buffer += chunk.replace(/\r\n?/g, '\n');

      let boundary = buffer.indexOf(FRAME_DELIMITER);
      while (boundary !== -1) {
        result = consumeFrame(buffer.slice(0, boundary), onToken);
        buffer = buffer.slice(boundary + FRAME_DELIMITER.length);

        if (result) break;

        boundary = buffer.indexOf(FRAME_DELIMITER);
      }
    }
  } catch {
    /** abort 포함 — 호출부가 중단 여부를 판단한다 */
    return { type: 'fail', reason: 'connection_lost' };
  } finally {
    reader.cancel().catch(() => {});
  }

  /** done도 error도 없이 닫힌 경우는 성공이 아니다 */
  return result ?? { type: 'fail', reason: 'connection_lost' };
};
