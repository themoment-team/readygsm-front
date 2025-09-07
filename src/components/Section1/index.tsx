'use client';

import { BottomArrow } from '@/assets';
import { cn } from '@/lib/utils';

const Section1 = () => {
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
                'left-1/2',
                'z-10',
                'flex',
                '-top-5',
                'gap-8',
                'translate-x-[calc(-100%-73px)]',

                'mobile-lg:-top-4',
                'mobile-lg:gap-4',
                'mobile-lg:translate-x-[calc(-100%-50px)]',

                'tablet:-top-5',
                'tablet:gap-8',
                'tablet:translate-x-[calc(-100%-73px)]',

                'hidden',
                'mobile-lg:flex',
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
        <button
          onClick={() => {
            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-[0.25rem]"
        >
          <span className="text-lg font-semibold text-white">GSM 더 알아보기</span>

          <div className="animate-elegant-bounce inline-block">
            <BottomArrow />
          </div>
        </button>
      </div>

      <style jsx>{`
        @keyframes elegantBounce {
          0% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-4px);
          }
          70% {
            transform: translateY(2px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-elegant-bounce {
          animation: elegantBounce 1s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Section1;
