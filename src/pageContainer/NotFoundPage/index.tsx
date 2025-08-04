'use client';

import { useRouter } from 'next/navigation';

import { Arrow2, Four, Zero } from '@/assets';
import { cn } from '@/lib/utils';

const squares = [
  { bgColor: 'bg-sky-300', rotate: 'rotate-[125deg]' },
  { bgColor: 'bg-sky-800', rotate: 'rotate-[-24.201deg]' },
  { bgColor: 'bg-lime-400', rotate: 'rotate-[22.536deg]' },
];

const NotFoundPage = () => {
  const router = useRouter();

  const GoBack = () => {
    if (document.referrer) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div
      className={cn(
        'relative',
        'flex',
        'min-h-screen',
        'flex-col',
        'items-center',
        'justify-center',
        'px-4',
        'text-center',
      )}
    >
      <div className={cn('relative', 'flex', 'flex-col', 'items-center', 'justify-center')}>
        <div className={cn('flex', 'flex-row', '-space-x-3')}>
          <Four color="#BEF264" />
          <Zero />
          <Four color="#0C4A6E" />
        </div>

        <div
          className={cn(
            'absolute',
            'left-[20rem]',
            'top-[90%]',
            'flex',
            'flex-row',
            'gap-[0.97rem]',
          )}
        >
          {squares.map((square, index) => (
            <div
              key={index}
              className={cn(
                square.bgColor,
                square.rotate,
                'h-[0.9375rem]',
                'w-[0.9375rem]',
                'rounded-md',
              )}
            />
          ))}
        </div>
      </div>

      <p
        className={cn(
          'mt-10',
          'text-[1.5rem]',
          'font-semibold',
          'text-black',
          'mobile:text-[1.125rem]',
          'mobile-lg:text-[1.25rem]',
          'tablet-sm:text-[1.375rem]',
          'tablet:text-[1.875rem]',
        )}
      >
        페이지를 찾을 수 없음
      </p>

      <p
        className={cn(
          'mt-2',
          'text-[1rem]',
          'text-gray-500',
          'tablet-sm:text-[1.125rem]',
          'tablet:text-[1.25rem]',
        )}
      >
        입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.
      </p>

      <button
        onClick={() => GoBack()}
        className={cn(
          'mt-8',
          'flex',
          'items-center',
          'space-x-2',
          'rounded-full',
          'border',
          'border-gray-400',
          'bg-white',
          'px-6',
          'py-2',
          'text-gray-500',
          'transition',
          'hover:bg-gray-100',
        )}
      >
        <Arrow2 />
        <p className={cn('text-gray-400', 'mobile:text-xs', 'mobile-lg:text-sm', 'sm:text-[1rem]')}>
          돌아가기
        </p>
      </button>
    </div>
  );
};

export default NotFoundPage;
