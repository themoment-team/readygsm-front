import * as Sentry from '@sentry/nextjs';

// 미로그인 401, 없는 리소스 404는 정상 흐름이라 이슈 목록을 덮어쓴다
const IGNORED_RESPONSE_STATUS = [401, 404];

const getResponseStatus = (error: unknown) => {
  if (typeof error !== 'object' || error === null) return undefined;

  return (error as { response?: { status?: number } }).response?.status;
};

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  sendDefaultPii: false,
  ignoreErrors: ['ResizeObserver loop'],
  beforeSend: (event, hint) => {
    const status = getResponseStatus(hint.originalException);

    if (status !== undefined && IGNORED_RESPONSE_STATUS.includes(status)) return null;

    return event;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
