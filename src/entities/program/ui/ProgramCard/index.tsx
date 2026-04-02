import { cn } from '@/shared/lib';

import type { ProgramComponentProps } from '../../model/types';

const ProgramCard = ({ title, content, date, personnel }: ProgramComponentProps) => {
  return (
    <section
      className={cn(
        'w-full max-w-155.5 cursor-pointer rounded-lg border border-[#CBD5E1] bg-white px-6 py-5 hover:border-[#7C91A9] hover:bg-[#EFF4FF]',
      )}
    >
      <header className={cn('flex items-center justify-between')}>
        <h2 className={cn('text-[24px] leading-[1.2] font-semibold text-[#292B2F]')}>{title}</h2>
        <p className={cn('text-[24px] leading-[1.2] font-semibold text-[#292B2F]')}>
          {personnel}명
        </p>
      </header>

      <ul
        className={cn(
          'mt-2 list-disc space-y-0.5 pl-5.25 text-[14px] leading-[1.4] font-normal text-[#656E82]',
        )}
      >
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <p className={cn('mt-4 text-[14px] leading-[1.4] font-normal text-[#656E82]')}>{date}</p>
    </section>
  );
};

export default ProgramCard;
