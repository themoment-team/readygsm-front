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
          'font-[Pretendard]',
          'text-[1.5rem]',
          'tracking-[-0.009rem]',
          'text-[var(--blue2,#0C4A6E)]',
        )}
      >
        {email}
      </div>
    </div>
  );
};

const Box = ({}) => {
  return <div></div>;
};

const ProfilePage = () => {
  const email = 'example123@gmail.com';
  return (
    <div className={cn('bg-background', 'h-screen', 'font-[Pretendard]')}>
      <div //이미지 + 유저 아이디
        className={cn(
          'mt-[10.38rem]',
          'flex',
          'flex-col',
          'items-center',
          'justify-center',
          'gap-4',
        )}
      >
        <Hello email={email} />
        <div className={cn('mt-[6.75rem]', 'flex', 'flex-col', 'gap-[1.81rem]')}>
          <div
            className={cn(
              'w-[88rem]',
              'text-[var(--Header-text,#111827)]',
              'font-[Pretendard]',
              'text-[1.75rem]',
              'leading-normal',
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
