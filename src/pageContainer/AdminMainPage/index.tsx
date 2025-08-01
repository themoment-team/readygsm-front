import { Circle } from '@/assets';
import { cn } from '@/lib/utils';

const AdminMainPage = () => {
  return (
    <div
      className={cn(
        'flex',
        'h-screen',
        'w-full',
        'flex-col',
        'items-center',
        'justify-center',
        'gap-[0.5rem]',
        'bg-bgDefault',
      )}
    >
      <div
        className={cn(
          'text-gray-700',
          'font-[Pretendard]',
          'text-[1.875rem]',
          'not-italic',
          'font-semibold',
          'leading-[2.25rem]',
          'tracking-[-0.01406rem]',
          'flex',
        )}
      >
        <span>2025&nbsp;</span>
        <span className={cn('text-blue-600', 'relative')}>
          READY,GSM&nbsp;
          <div className={cn('flex', 'gap-[0.88rem]', 'absolute', 'bottom-[2rem]', 'left-[7rem]')}>
            <Circle />
            <Circle />
            <Circle />
          </div>
        </span>
        <span>ADMIN SERVICE</span>
      </div>
      <div className={cn('text-gray-800', 'text-center', 'text-base', 'font-normal', 'leading-6')}>
        광주소프트웨어 마이스터고등학교 신청 서비스
      </div>
    </div>
  );
};

export default AdminMainPage;
