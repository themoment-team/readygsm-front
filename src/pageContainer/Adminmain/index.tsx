import { Rami } from '@/assets';
import { cn } from '@/lib/utils';

const Adminmain = () => {
  return (
    <div
      className={cn('flex h-screen w-full flex-col items-center justify-center', 'gap-[0.5rem]')}
    >
      <div
        className={cn(
          'text-[var(--gray-700,#374151)]', // 텍스트 색상
          'font-[Pretendard]', // 폰트 (또는 font-pretendard)
          'text-[1.875rem]', // 폰트 크기
          'not-italic', // 일반체
          'font-semibold', // font-weight: 600
          'leading-[2.25rem]', // 줄간격
          'tracking-[-0.01406rem]',
          'flex',
          'flex-row',
        )}
      >
        <span>2025 &nbsp;</span>
        <span className={cn('text-[var(--gray-700,#2563EB)]', 'relative')}>
          READY,GSM&nbsp;
          <div
            className={cn(
              'flex',
              'flex-row',
              'gap-[0.88rem]',
              'absolute',
              'bottom-[2rem]',
              'left-[7rem]',
            )}
          >
            <Rami></Rami>
            <Rami></Rami>
            <Rami></Rami>
          </div>
        </span>
        <span>SERVICE </span>
      </div>
      <div
        className={cn(
          'text-[var(--gray-800,#1F2937)]',
          'text-center',
          'text-base',
          'font-normal',
          'leading-6',
        )}
      >
        광주소프트웨어 마이스터고등학교 신청 서비스
      </div>
    </div>
  );
};

export default Adminmain;
