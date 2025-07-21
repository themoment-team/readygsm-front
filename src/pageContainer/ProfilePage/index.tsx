import { useQuery } from '@tanstack/react-query';

import { get } from '@/lib/api';
import { cn } from '@/lib/utils';

const Hello: React.FC<{ email: string }> = ({ email }) => {
  return (
    <div className={cn('flex', 'flex-col', 'justify-center', 'items-center', 'gap-[1.25rem]')}>
      <div
        className={cn(
          'rounded-[1.5rem]',
          'bg-[var(--gray,#E2E8F0)]',
          'flex',
          'w-[5.5rem]',
          'h-[5.5rem]',
          'px-[1.5rem]',
          'py-[1.375rem]',
          'items-center',
        )}
      ></div>
      <div
        className={cn(
          'text-[var(--slate-800,#1E293B)]',
          'text-center',
          'font-[Pretendard]',
          'text-[1.5rem]',
          'leading-[2rem]',
          'tracking-[-0.009rem]',
        )}
      >
        {email}님
      </div>
    </div>
  );
};

const Box = ({}) => {
  return <div>asdf</div>;
};

const ProfilePage = () => {
  const email = 's24015@gsm.hs.kr';
  return (
    <div className={cn('bg-background', 'h-screen', 'font-[Pretendard]')}>
      <div //이미지 + 유저 아이디
        className={cn(
          'mt-[4.97rem]',
          'flex',
          'flex-col',
          'items-center',
          'justify-center',
          'gap-8',
        )}
      >
        <Hello email={email} />
        <div className={cn('flex', 'flex-col', 'gap-4')}>
          <div
            className={cn(
              'w-[60rem]',
              'text-[var(--gray-700,#374151)]',
              'font-[Pretendard]',
              'text-[1.5rem]',
              'leading-[1.5rem]',
            )}
          >
            신청된 프로그램
          </div>
          <Box></Box>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
