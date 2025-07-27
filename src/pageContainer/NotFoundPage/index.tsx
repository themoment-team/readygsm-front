'use client';

import { useRouter } from 'next/navigation';

import { Arrow, Four, Four2, Zero } from '@/assets';
import { cn } from '@/lib/utils';

const NotFound = () => {
  const router = useRouter();

  const GoBack = () => {
    if (document.referrer) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="relative flex flex-col items-center justify-center">
        <div className="flex flex-row -space-x-3">
          <Four />
          <Zero />
          <Four2 />
        </div>

        <div className="absolute left-[20rem] top-[90%] flex flex-row gap-[0.97rem]">
          <div className="h-[0.9375rem] w-[0.9375rem] rotate-[125.004deg] rounded-md bg-blue-300" />
          <div className="h-[0.9375rem] w-[0.9375rem] rotate-[-24.201deg] rounded-md bg-blue-700" />
          <div className="h-[0.9375rem] w-[0.9375rem] rotate-[22.536deg] rounded-md bg-lime-400" />
        </div>
      </div>

      <p className="mt-20 text-[1.5rem] font-bold text-black mobile:text-[1.125rem] mobile-lg:text-[1.25rem] tablet-sm:text-[1.375rem] tablet:text-[1.5rem]">
        페이지를 찾을 수 없음
      </p>

      <p className="mt-4 text-[1.5rem] text-gray-400 mobile:text-[0.875rem] mobile-lg:text-[1rem] tablet-sm:text-[1.125rem] tablet:text-[1.25rem] tablet-lg:text-[1.375rem] desktop-sm:text-[1.5rem] desktop:text-[1.625rem] desktop-lg:text-[1.75rem] desktop-xl:text-[1.875rem]">
        입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.
      </p>

      <button
        onClick={() => GoBack()}
        className="mt-8 flex items-center space-x-2 rounded-full border border-gray-400 bg-white px-6 py-2 text-gray-500 transition hover:bg-gray-100"
      >
        <Arrow />

        <p className="text-gray-400 mobile:text-xs mobile-lg:text-sm sm:text-[1rem]">돌아가기</p>
      </button>
    </div>
  );
};

export default NotFound;
