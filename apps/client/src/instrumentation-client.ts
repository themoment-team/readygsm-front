import * as Sentry from '@sentry/nextjs';

// 미로그인 401·없는 리소스 404는 정상 흐름이라 제외한다 (axios 오류에만 해당)
const IGNORED_AXIOS_RESPONSE_STATUS = [401, 404];

const getAxiosResponseStatus = (error: unknown) => {
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
    const status = getAxiosResponseStatus(hint.originalException);

    if (status !== undefined && IGNORED_AXIOS_RESPONSE_STATUS.includes(status)) return null;

    return event;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
