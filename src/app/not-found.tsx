'use client';

import { useRouter } from 'next/navigation';

import Four from '@/asset/four';
import Four2 from '@/asset/four2';
import Zero from '@/asset/zero';
import { cn } from '@/lib/utils';

const NotFound = () => {
  const router = useRouter();

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

      <p className="mt-20 text-[24px] font-bold text-black mobile:text-[18px] mobile-lg:text-[20px] tablet-sm:text-[22px] tablet:text-[24px]">
        페이지를 찾을 수 없음
      </p>
      <p className="mt-4 text-[24px] text-gray-400 mobile:text-[14px] mobile-lg:text-[16px] tablet-sm:text-[18px] tablet:text-[20px]">
        입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.
      </p>

      <button
        onClick={() => router.push('/')}
        className="mt-8 flex items-center space-x-2 rounded-full border border-gray-400 bg-white px-6 py-2 text-gray-500 transition hover:bg-gray-100"
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 15.5L3.5 9.5M3.5 9.5L9.5 3.5M3.5 9.5H15.5C17.0913 9.5 18.6174 10.1321 19.7426 11.2574C20.8679 12.3826 21.5 13.9087 21.5 15.5C21.5 17.0913 20.8679 18.6174 19.7426 19.7426C18.6174 20.8679 17.0913 21.5 15.5 21.5H12.5"
            stroke="#7E8490"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <p className="text-gray-400 mobile:text-xs mobile-lg:text-sm sm:text-[1rem]">돌아가기</p>
      </button>
    </div>
  );
};

export default NotFound;
