'use client';

import { cn } from '@/lib/utils';

import MajorCard from '../MajorCard';

const features = [
  {
    imgSrc: '/software.png',
    title: '소프트웨어 개발과',
    tags: ['운영체제', 'C', 'C++', 'JAVA', '네트워크', '모바일'],
    tagColor: { bg: '#EFF6FF', text: '#0EA5E9' },
    description:
      'SW개발의 계획에서부터 분석, 설계, 코딩, 테스트링, 유지보수까지 전반적인 학습 / 맞춤형 실무교육을 통해 정보 시스템 개발과 웹/모바일, 콘텐츠 제작이 가능하도록 전문 인재 양성',
  },
  {
    imgSrc: '/iot.png',
    title: '스마트 IOT(Internet Of Things)과',
    tags: ['리눅스', '라즈베리파이', '아두이노', '하드웨어'],
    tagColor: { bg: '#F7FEE7', text: '#4D7C0F' },
    description:
      '사물에 내장된 컴퓨터가 수행할 수 있는 소프트웨어개발 사물에 센서를 부착해 실시간으로 데이터를 인터넷으로 주고받는 기술인 IT융합 소프트웨어를 설계, 개발이 가능한 전문 인재를 양성',
  },
  {
    imgSrc: '/ai.png',
    title: '인공지능(AI)과',
    tags: ['빅데이터', '사물인터넷', '머신러닝', '딥러닝'],
    tagColor: { bg: '#EFF6FF', text: '#0C4A6E' },
    description:
      '인공지능, 빅데이터, 사물인터넷을 바탕으로 한 인공지능 기반 기술을 교육하여 인공지능 서비스의 요구사항을 실현하기 위한 인공지능 플랫폼 구현, 인공지능 서비스 기획 전문 인재를 양성',
  },
];

const Section3 = () => {
  return (
    <div className={cn('bg-gray-50')}>
      <section className={cn('mx-auto', 'max-w-[75rem]', 'px-[1rem]', 'py-[8rem]')}>
        <div className={cn('mb-[3rem]', 'flex', 'max-w-[37.5rem]', 'flex-col', 'gap-[1rem]')}>
          <h2
            className={cn(
              'mb-[0.5rem]',
              'text-[2rem]',
              'font-extrabold',
              'leading-tight',
              'text-black',
            )}
          >
            창의 융합력을 갖춘
            <br />
            글로벌 소프트웨어 학과 소개
          </h2>
          <p className={cn('text-[1.25rem]', 'font-normal', 'text-gray-500')}>
            체계적인 교육과정을 제공하는 소프트웨어 학과
          </p>
        </div>

        <div
          className={cn(
            'grid',
            'grid-cols-1',
            'gap-[1rem]',
            'mobile:grid-cols-1',
            'mobile-lg:grid-cols-2',
            'tablet-sm:grid-cols-2',
            'tablet:grid-cols-3',
          )}
        >
          {features.map((feature, index) => (
            <MajorCard
              key={index}
              imgSrc={feature.imgSrc}
              title={feature.title}
              tags={feature.tags}
              tagColor={feature.tagColor}
              description={feature.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Section3;
