'use client';

import { cn } from '@/lib/utils';

const TitleCard = (props: { text: React.ReactNode; emoji: string }) => {
  const { text, emoji } = props;

  return (
    <div
      className={cn('relative', 'h-[15.625rem]', 'rounded-xl', 'px-8', 'pb-6', 'pt-8', 'text-left')}
      style={{
        boxShadow: '0 4px 20px 0 rgba(112, 144, 176, 0.12)',
      }}
    >
      <p
        className={cn(
          'relative',
          '-left-[0.1rem]',
          'max-w-[22.5rem]',
          'font-[600]',
          'leading-[1.4]',
          'text-blue-700',
          'text-[1.25rem]',
          'desktop-sm:text-[1rem]',
        )}
      >
        {text}
      </p>
      <span
        className={cn(
          'absolute',
          'bottom-[1.375rem]',
          'right-[1.3rem]',
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
