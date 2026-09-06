'use client';

import { GoogleIcon, KakaoIcon, Logo } from '@shared/assets';
import { cn } from '@shared/lib';

import { useLogin } from '@/features/auth';

const LoginPage = () => {
  const { handleKakaoLogin, handleGoogleLogin } = useLogin();

  return (
    <div className={cn('flex h-screen flex-col items-center justify-center gap-8')}>
      <div className={cn('flex flex-col items-center gap-3')}>
        <Logo />
        <h1 className={cn('text-neutral-dark text-2xl font-semibold tracking-[-0.144px]')}>
          관리자 로그인
        </h1>
      </div>
      <div className={cn('flex flex-col gap-3')}>
        <button
          className={cn(
            'flex w-75 cursor-pointer items-center justify-center gap-4 rounded-lg bg-[#fee500] py-4 pr-8 pl-7',
          )}
          onClick={handleKakaoLogin}
        >
          <KakaoIcon />
          <span className={cn('text-lg font-semibold text-[rgba(0,0,0,0.85)]')}>
            카카오로 시작하기
          </span>
        </button>
        <button
          className={cn(
            'border-neutral-light bg-pure-white flex w-75 cursor-pointer items-center justify-center gap-4 rounded-lg border border-solid py-4 pr-8 pl-7',
          )}
          onClick={handleGoogleLogin}
        >
          <GoogleIcon />
          <span className={cn('text-lg font-semibold text-[#374151]')}>
            Google 계정으로 시작하기
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
