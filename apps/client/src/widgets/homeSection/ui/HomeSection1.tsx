import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@shared/lib';
import { AnimateOnView, buttonVariants } from '@shared/ui';

const ACTIVITY_PERIOD = '9월 16일 ~ 9월 22일';

const HomeSection1 = () => {
  return (
    <section className={cn('flex w-full flex-col')}>
      <AnimateOnView className={cn('flex flex-col items-center gap-6 lg:gap-15.5')}>
        <Image
          src="/images/home-wordmark.svg"
          alt="광주소프트웨어마이스터고"
          width={1920}
          height={165}
          priority
          unoptimized
          className={cn('h-auto w-full')}
        />
        <div
          className={cn(
            'text-neutral-dark flex flex-col items-center gap-2 text-center lg:gap-4 xl:gap-6',
          )}
        >
          <h1 className={cn('text-2xl leading-[1.2] font-bold lg:text-5xl xl:text-7xl')}>
            <span className={cn('block')}>단순한 개발자를 넘어 세상을 바꾸는</span>
            <span className={cn('block')}>
              <span className={cn('text-brand-primary')}>마이스터(Meister)</span>의 길
            </span>
          </h1>
          <p className={cn('text-xs leading-[1.4] font-medium lg:text-base')}>
            학과 체험 접수 기간 : {ACTIVITY_PERIOD}
          </p>
        </div>
        <Link
          href="/programs"
          className={cn(
            buttonVariants({ variant: 'default', size: 'pillSm' }),
            'lg:w-95',
            'xl:h-17 xl:w-125 xl:text-xl xl:font-semibold',
          )}
        >
          학과 체험 신청하기
        </Link>
      </AnimateOnView>
      <AnimateOnView
        className={cn(
          'relative mt-9.5 h-125 w-full overflow-hidden rounded-[1.5rem]',
          'lg:mt-27.75 xl:mt-50.75',
        )}
      >
        <Image
          src="/images/home-band.png"
          alt=""
          fill
          priority
          className={cn('object-cover object-center')}
        />
      </AnimateOnView>
    </section>
  );
};

export default HomeSection1;
