'use client';

import { cn } from '@/lib/utils';

const TitleCard = (props: { text: React.ReactNode; emoji: string }) => {
  const { text, emoji } = props;

  return (
    <div
      className={cn(
        'relative',
        'mt-16',
        'h-[15.625rem]',
        'rounded-xl',
        'px-8',
        'pb-6',
        'pt-8',
        'text-left',
      )}
      style={{
        boxShadow: '0px 4px 20px 0px rgba(112, 144, 176, 0.12)',
      }}
    >
      <p
        className={cn(
          'max-w-[22.5rem]',
          'text-[1.2rem]',
          'font-semibold',
          'leading-[1.4]',
          'text-blue-700',
        )}
        style={{ position: 'relative', left: '-1.25rem' }}
      >
        {text}{' '}
      </p>
      <span
        className={cn(
          'absolute',
          'bottom-[2.375rem]',
          'right-[0.9375rem]',
          'text-3xl',
          'text-[4.25rem]',
        )}
      >
        {emoji}
      </span>
    </div>
  );
};

export default TitleCard;
