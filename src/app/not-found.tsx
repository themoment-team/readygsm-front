import Link from 'next/link';

import { cn } from '@/shared/lib';

const NotFound = () => {
  return (
    <div className={cn('flex h-[calc(100vh-72px)] flex-col items-center justify-center gap-4')}>
      <h1 className={cn('text-center text-[3rem] leading-[3.6rem] font-bold text-[#4A80F8]')}>
        404 Not Found
      </h1>
      <p className={cn('text-center text-[1.5rem] leading-9 font-normal text-[#656E82]')}>
        잘못된 경로입니다. 존재하지 않는 주소를 입력하셨거나, <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </p>
      <Link
        href="/"
        className={cn(
          'flex items-center justify-center gap-2.5 rounded-lg bg-[#4A80F8] px-6 py-3 text-[1.125rem] leading-5 font-semibold text-white hover:bg-[#3D6BD0]',
        )}
      >
        홈 화면으로 이동
      </Link>
    </div>
  );
};

export default NotFound;
