'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className={cn('flex h-[calc(100vh-72px)] flex-col items-center justify-center gap-4')}>
      <h1 className={cn('text-center text-[3rem] leading-[3.6rem] font-bold text-[#4A80F8]')}>
        404 Not Found
      </h1>
      <p className={cn('text-center text-[1.5rem] leading-9 font-normal text-[#656E82]')}>
        잘못된 경로입니다. 존재하지 않는 주소를 입력하셨거나, <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </p>
      <Button variant="default" size="md" onClick={() => router.push('/')}>
        홈 화면으로 이동
      </Button>
    </div>
  );
};

export default NotFound;
