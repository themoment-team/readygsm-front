import Image from 'next/image';

import { GoogleIcon, KakaoIcon } from '@shared/assets';
import { cn } from '@shared/lib';
import { Modal } from '@shared/ui';

import { useLogin } from '../model/useLogin';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { handleKakaoLogin, handleGoogleLogin } = useLogin();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={cn('p-6')}>
      <div className={cn('relative flex flex-col items-center gap-8')}>
        <button
          type="button"
          onClick={onClose}
          aria-label="로그인 창 닫기"
          className={cn(
            'absolute top-0 right-0 flex size-5 cursor-pointer items-center justify-center',
          )}
        >
          <Image src="/icons/Icon.png" alt="" width={20} height={20} />
        </button>
        <h2 className={cn('text-neutral-dark text-2xl font-semibold tracking-[-0.144px]')}>
          로그인
        </h2>
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
    </Modal>
  );
};

export default LoginModal;
