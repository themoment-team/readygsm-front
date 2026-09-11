import Image from 'next/image';

import { cn } from '@shared/lib';
import { AnimateOnView } from '@shared/ui';

import SectionLabel from './SectionLabel';

const HomeSection2 = () => {
  return (
    <section className={cn('flex w-full flex-col gap-6 lg:gap-12')}>
      <AnimateOnView className={cn('flex flex-col gap-4')}>
        <SectionLabel label="Curriculum" />
        <h2 className={cn('text-neutral-dark text-2xl leading-normal font-bold lg:text-[4rem]')}>
          학교 · 학과 소개와 <span className={cn('text-brand-primary')}>교육과정</span>
        </h2>
      </AnimateOnView>
      <AnimateOnView
        delay={200}
        className={cn('flex w-full flex-col items-start gap-6 lg:flex-row lg:gap-12')}
      >
        <div
          className={cn(
            'relative aspect-square w-full overflow-hidden rounded-[1.5rem]',
            'lg:aspect-[350/323] lg:w-107.25 lg:shrink-0 xl:w-175',
          )}
        >
          <Image src="/images/home-curriculum.png" alt="" fill className={cn('object-cover')} />
        </div>
        <div className={cn('flex w-full min-w-0 flex-1 flex-col justify-center gap-9')}>
          <p className={cn('text-neutral-dark text-sm leading-normal font-bold lg:text-xl')}>
            GSM은 이론에 머무르지 않습니다. 소프트웨어, IoT, AI를 현장 실무 중심으로 배우고, 국내외
            캠프와 국제 교류를 통해 세상을 보는 눈까지 함께 키우는 소프트웨어 마이스터고입니다.
            우리는 학생 한 명 한 명을 &apos;현장에서 통하는 개발자&apos;로 성장시키는 것을 목표로
            합니다.
          </p>
          <div
            className={cn(
              'flex flex-col gap-6 text-[0.8125rem] leading-normal font-normal text-[#70757e]',
              'lg:text-base',
            )}
          >
            <div className={cn('flex flex-col gap-8')}>
              <p>전공 교과는 세 갈래로 이어집니다.</p>

              <ul className={cn('list-disc space-y-2 pl-8')}>
                <li>
                  <strong className={cn('font-bold')}>소프트웨어개발과</strong>
                  에서는 데브옵스, 프로그래밍, 웹 개발, 서버 구축까지 서비스를 만드는 전 과정을 직접
                  경험합니다.
                </li>

                <li>
                  <strong className={cn('font-bold')}>스마트IoT과</strong>
                  에서는 기기 제어, 임베디드 시스템으로 현실 세계와 연결되는 기술을 배웁니다.
                </li>

                <li>
                  <strong className={cn('font-bold')}>인공지능과</strong>
                  에서는 빅데이터 분석, 머신러닝 등 미래를 만드는 핵심 기술을 다룹니다.
                </li>
              </ul>

              <p>
                여기에 더해 글로벌 역량 강화 활동이 함께합니다. 전공 심화 학습과 자격증 취득으로
                기본기를 다지고, 국내외 캠프와 국제 교류 프로그램으로 경험을 넓히며, 회화 중심
                수업으로 글로벌 무대에서 통하는 커뮤니케이션 능력을 기릅니다.
              </p>
            </div>
          </div>
        </div>
      </AnimateOnView>
    </section>
  );
};

export default HomeSection2;
