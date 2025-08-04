'use client';

import { Dot } from '@/assets';
import { cn } from '@/lib/utils';

import TitleCard from './TitleCard';

export default function Section2() {
  return (
    <section
      id="features"
      className={cn(
        'flex',
        'min-h-screen',
        'flex-col',
        'items-center',
        'justify-center',
        'bg-gray-50',
        'px-4',
        'py-20',
      )}
    >
      <div className={cn('text-center', 'text-[2rem]', 'font-[600]', 'leading-snug')}>
        <div>
          <span className={cn('relative', 'inline-block')}>
            <div
              className={cn(
                'absolute',
                '-top-4',
                'left-1/2',
                'z-10',
                'flex',
                '-translate-x-1/2',
                'gap-3',
              )}
            >
              <Dot color="#AFDB00" />
            </div>
            <span className={cn('text-lime-400')}>인성</span>
          </span>
          <span className={cn('text-blue-700')}>과 </span>
          <span className={cn('relative', 'inline-block')}>
            <div
              className={cn(
                'absolute',
                '-top-4',
                'left-1/2',
                'z-10',
                'flex',
                '-translate-x-1/2',
                'gap-3',
              )}
            >
              <Dot color="#AFDB00" />
            </div>
            <span className={cn('text-lime-400')}>감성</span>
          </span>
          <span className={cn('text-black')}>으로</span>{' '}
          <span className={cn('relative', 'inline-block')}>
            <div
              className={cn(
                'absolute',
                '-top-4',
                'left-1/2',
                'z-10',
                'flex',
                '-translate-x-1/2',
                'gap-3',
              )}
            >
              <Dot color="#3DAEFF" />
            </div>
            <span className={cn('text-blue-200')}>감동</span>
          </span>
          <span className={cn('text-black')}>을 만드는</span>
        </div>
        <div className={cn('mt-1')}>광주소프트웨어마이스터고등학교</div>
      </div>

      <div
        className={cn(
          'grid',
          'w-full',
          'max-w-6xl',
          'grid-cols-1',
          'gap-3',
          'mobile-lg:grid-cols-2',
          'tablet:grid-cols-4',
        )}
      >
        <TitleCard
          text={
            <>
              AI 시대를 선도할
              <br />
              GSM 교육과정 운영
            </>
          }
          emoji="🎯"
        />
        <TitleCard
          text={
            <>
              직업군에 최적화된
              <br />
              취업역량 강화
            </>
          }
          emoji="💪"
        />
        <TitleCard
          text={
            <>
              산업수요 변화에 맞춘
              <br />
              현장실무능력 향상
            </>
          }
          emoji="💡"
        />
        <TitleCard
          text={
            <>
              자율설계와 자기 주도성으로
              <br />
              학습 능력 신장
            </>
          }
          emoji="🚀"
        />
      </div>
    </section>
  );
}
