import Link from 'next/link';

import { cn } from '@/shared/lib';
import { buttonVariants } from '@/shared/ui';

const NotFound = () => {
  return (
    <div className={cn('flex h-[calc(100vh-6.25rem)] flex-col items-center justify-center gap-4')}>
      <h1 className={cn('text-brand-primary text-center text-5xl leading-[3.6rem] font-bold')}>
        404 Not Found
      </h1>
      <p className={cn('text-secondary-slate text-center text-2xl leading-9 font-normal')}>
        잘못된 경로입니다. 존재하지 않는 주소를 입력하셨거나, <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </p>
      <Link href="/" className={cn(buttonVariants({ variant: 'default', size: 'md' }))}>
        홈 화면으로 이동
      </Link>
    </div>
  );
};

export default NotFound;
