import { cn } from '@/lib/utils';

const AdminMain = () => {
  return (
    <div
      className={cn(
        'flex h-screen',
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
        <span
          className={cn(
            'text-blue-600',
            'relative',
            'before:absolute',
            "before:content-['•••']",
            'before:tracking-[0.87rem]',
            'before:-top-[1.275rem]',
            'before:right-[0.2rem]',
            'before:text-[1.25rem]',
            'before:text-blue-100',
          )}
        >
          READY,GSM&nbsp;
        </span>
        <span>ADMIN SERVICE</span>
      </div>
      <div className={cn('text-gray-800', 'text-center', 'text-base', 'font-normal', 'leading-6')}>
        광주소프트웨어 마이스터고등학교 신청 서비스
      </div>
    </div>
  );
};

export default AdminMain;
