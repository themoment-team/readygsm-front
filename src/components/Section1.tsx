'use client';

import { BottomArrow } from '@/assets';
import { cn } from '@/lib/utils';

export default function Section1() {
  return (
    <section
      className={cn('relative', 'h-screen', 'bg-cover', 'bg-center')}
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div
        className={cn(
          'absolute',
          'inset-0',
          'flex',
          'flex-col',
          'items-center',
          'justify-center',
          'bg-black/40',
          'px-4',
          'text-center',
        )}
      >
        <div className={cn('text-white')}>
          <h1
            className={cn(
              'relative',
              'text-[2.25rem]',
              'font-bold',
              'leading-snug',
              'tablet:text-[3.25rem]',
            )}
          >
            <div
              className={cn(
                'absolute',
                '-top-5',
                'left-1/2',
                'z-10',
                'flex',
                'translate-x-[calc(-100%-73px)]',
                'gap-8',
              )}
            >
              <div className={cn('h-2', 'w-2', 'rounded-full', 'bg-lime-300')} />
              <div className={cn('h-2', 'w-2', 'rounded-full', 'bg-lime-300')} />
              <div className={cn('h-2', 'w-2', 'rounded-full', 'bg-lime-300')} />
            </div>
            <span className={cn('text-blue-100')}>Ready GSM</span>과 함께 나에게 맞는
            <br />
            GSM을 직접 경험해보세요!
          </h1>
        </div>
      </div>

      <div
        className={cn(
          'absolute',
          'left-1/2',
          'top-[70%]',
          'flex',
          '-translate-x-1/2',
          'flex-col',
          'items-center',
        )}
      >
        <div className={cn('animate-elegant-bounce', 'mt-2')}>
          <button
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={cn('flex', 'flex-col', 'items-center', 'gap-[0.25rem]')}
          >
            <span className={cn('text-lg', 'font-semibold', 'text-white')}>GSM 더 알아보기</span>
            <BottomArrow />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes elegantBounce {
          0% {
            transform: translateY(0);
            opacity: 0.7;
          }
          50% {
            transform: translateY(12px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0.7;
          }
        }
        .animate-elegant-bounce {
          animation: elegantBounce 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
