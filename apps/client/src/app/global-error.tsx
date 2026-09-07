'use client';

import { useEffect } from 'react';

import * as Sentry from '@sentry/nextjs';

import { cn } from '@shared/lib';
import { pretendard } from '@shared/styles';
import { Button } from '@shared/ui';

import './globals.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ko">
      <body
        className={cn(
          pretendard.className,
          'flex min-h-screen flex-col items-center justify-center gap-4',
        )}
      >
        <h1 className={cn('text-brand-primary text-center text-5xl leading-[3.6rem] font-bold')}>
          오류가 발생했습니다
        </h1>
        <p className={cn('text-secondary-slate text-center text-2xl leading-9 font-normal')}>
          일시적인 문제로 페이지를 불러오지 못했습니다. <br />
          잠시 후 다시 시도해 주세요.
        </p>
        <Button variant="default" size="md" onClick={reset}>
          다시 시도
        </Button>
      </body>
    </html>
  );
};

export default GlobalError;
