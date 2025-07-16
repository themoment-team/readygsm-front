import { cn } from '@/lib/utils';

const Hello: React.FC<{ username: string }> = ({ username }) => {
  return (
    <div
      className={cn(
        'text-black',
        'text-center',
        'text-[2.5rem]',
        'not-italic',
        'font-normal',
        'leading-normal',
        'h-[5.125rem]',
        'relative',
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
      )}
    >
      <div>{username}님, 반갑습니다!</div>
      <div
        className={cn(
          'rounded-[9.375rem]',
          'bg-[rgba(156,194,255,0.15)]',
          'blur-[30px]',
          'w-[94.05%]',
          'h-[5.125rem]',
          'absolute',
          'top-1/2',
          'left-1/2',
          'transform',
          '-translate-x-1/2',
          '-translate-y-1/2',
        )}
      ></div>
    </div>
  );
};

const Email: React.FC<{ email: string }> = ({ email }) => {
  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'text-[1.5rem]',
        'gap-[1.5rem]',
      )}
    >
      <div>프로필</div>
      <div>{email}</div>
    </div>
  );
};

const ProfilePage = () => {
  const username = 'example123';
  const email = 'example123@gmail.com';
  return (
    <div className={cn('bg-background', 'h-screen', 'font-[Pretendard]')}>
      <div className={cn('mt-16', 'flex', 'flex-col', 'items-center', 'justify-center', 'gap-4')}>
        <Hello username={username} />
        <div className={cn('flex', 'flex-col', 'items-center', 'justify-center', 'gap-[7rem]')}>
          <Email email={email} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
