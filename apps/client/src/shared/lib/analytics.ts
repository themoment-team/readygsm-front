'use client';

import { sendGAEvent } from '@next/third-parties/google';

/**
 * app/layout.tsx가 GoogleAnalytics를 렌더하는 조건과 같다.
 * 측정 ID가 없는 환경에서는 SDK가 호출마다 콘솔 경고를 남기므로 미리 끊는다.
 */
const IS_GA_ENABLED = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);

/**
 * 식별자와 상태 코드는 숫자여도 문자열로 보낸다.
 * GA4 맞춤 측정기준은 파라미터의 문자열 값만 읽어서, 숫자로 들어가면 (not set)으로 빠진다.
 * 평균·합계를 낼 값(message_length)만 숫자로 둔다.
 */
interface ActivityParamsType {
  activity_id: string;
  activity_name: string;
}

/** 서버가 상태 코드를 주지 않은 경우(네트워크 단절 등)는 'unknown'으로 보낸다 */
type ErrorStatusType = string;

/**
 * 이벤트별 파라미터 계약.
 *
 * 이름·연락처·학교명 같은 개인정보는 어떤 이벤트에도 넣지 않는다.
 * GA4 약관이 금지하는 데이터이고, 한번 수집되면 되돌릴 수 없다.
 */
interface GaEventParamsMapType {
  apply_form_open: ActivityParamsType;
  apply_submit: ActivityParamsType;
  apply_success: ActivityParamsType;
  apply_error: ActivityParamsType & { status: ErrorStatusType };
  apply_cancel_submit: { activity_id: string };
  apply_cancel_success: { activity_id: string };
  apply_cancel_error: { activity_id: string; status: ErrorStatusType };
  chatbot_open: Record<string, never>;
  chatbot_message: { message_length: number };
  chatbot_error: { fail_reason: string };
}

export type GaEventNameType = keyof GaEventParamsMapType;

/**
 * 이벤트 이름과 파라미터를 타입으로 고정한다.
 * GA4는 한번 들어온 이벤트 이름을 지울 수 없어서, 오타가 그대로 영구 지표가 된다.
 */
export const trackEvent = <T extends GaEventNameType>(name: T, params: GaEventParamsMapType[T]) => {
  if (!IS_GA_ENABLED) return;

  sendGAEvent('event', name, params);
};
