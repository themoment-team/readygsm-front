'use client';

import { Dot } from '@/assets';
import { cn } from '@/lib/utils';

import TitleCard from '../TitleCard';

const Titlecard = [
  {
    text: (
      <>
        AI 시대를 선도할
        <br />
        GSM 교육과정 운영
      </>
    ),
    emoji: '🎯',
  },
  {
    text: (
      <>
        직업군에 최적화된
        <br />
        취업역량 강화
      </>
    ),
    emoji: '💪',
  },
  {
    text: (
      <>
        산업수요 변화에 맞춘
        <br />
        현장실무능력 향상
      </>
    ),
    emoji: '💡',
  },
  {
    text: (
      <>
        자율설계와 자기 주도성으로
        <br />
        학습 능력 신장
      </>
    ),
    emoji: '🚀',
  },
];

const Section2 = () => {
  return (
    <section
      id="features"
      className={cn(
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'bg-bgDefault',
        'px-4',
        'py-[11.25rem]',
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
        <div className={cn('mt-1', 'text-black')}>광주소프트웨어마이스터고등학교</div>
      </div>

      <div className={cn('flex', 'flex-wrap', 'w-full', 'max-w-6xl', 'gap-3', 'justify-center')}>
        {Titlecard.map((card, index) => (
          <div
            key={index}
            className={cn(
              'w-full',
              'mobile-lg:w-[calc(50%-0.75rem)]',
              'tablet-sm:w-[calc(50%-0.75rem)]',
              'tablet:w-[calc(50%-0.75rem)]',
              'tablet-lg:w-[calc(25%-0.75rem)]',
            )}
          >
            <TitleCard text={card.text} emoji={card.emoji} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section2;
