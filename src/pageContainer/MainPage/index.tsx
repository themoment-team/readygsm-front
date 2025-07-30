'use client';

import React from 'react';

import { Arrow, Dot } from '@/assets';
import { cn } from '@/lib/utils';

const FeatureBox = (props: { text: React.ReactNode; emoji: string }) => {
  const { text, emoji } = props;
  return (
    <div
      className={cn('relative mt-16 h-[15.625rem] rounded-xl px-8 pb-6 pt-8 text-left')}
      style={{
        boxShadow: '0px 4px 20px 0px rgba(112, 144, 176, 0.12)',
      }}
    >
      <p
        className={cn('max-w-[22.5rem] text-[1.2rem] font-semibold leading-[1.4] text-blue-700')}
        style={{ position: 'relative', left: '-1.25rem' }}
      >
        {text}{' '}
      </p>
      <span className={cn('absolute bottom-[2.375rem] right-[0.9375rem] text-3xl text-[4.25rem]')}>
        {emoji}
      </span>
    </div>
  );
};

type FeatureProps = {
  imgSrc: string;
  title: string;
  tags: string[];
  description: string;
  tagColor?: {
    bg: string;
    text: string;
  };
};

const Feature = ({ imgSrc, title, tags, tagColor, description }: FeatureProps) => {
  return (
    <article className={cn('rounded-[1rem] bg-gray-50')}>
      <img
        src={imgSrc}
        alt={title}
        className={cn('mb-6 h-[13rem] w-full rounded-[1rem] object-cover')}
      />
      <div className={cn('p-4')}>
        <h3 className={cn('mb-4 whitespace-nowrap text-[1.5rem] font-semibold text-black')}>
          {title}
        </h3>
        <div className={cn('mb-3 flex w-max gap-2 overflow-x-auto')}>
          {tags.map((tag) => (
            <span
              key={tag}
              className={cn('rounded-full px-1.5 py-0.5 text-xs font-medium')}
              style={
                tagColor
                  ? {
                      backgroundColor: tagColor.bg,
                      color: tagColor.text,
                    }
                  : undefined
              }
            >
              #{tag}
            </span>
          ))}
        </div>
        <p className={cn('text-[1.125rem] leading-relaxed text-gray-500')}>{description}</p>
      </div>
    </article>
  );
};

export default function MainPage() {
  return (
    <>
      <div className={cn('w-full')}>
        {/* 섹션 1 */}
        <section
          className={cn('relative h-screen bg-cover bg-center')}
          style={{ backgroundImage: "url('/background.png')" }}
        >
          <div
            className={cn(
              'absolute inset-0 flex flex-col items-center justify-center',
              'bg-black/40 px-4 text-center',
            )}
          >
            <div className={cn('text-white')}>
              <h1
                className={cn(
                  'relative text-[2.25rem] font-bold leading-snug tablet:text-[3.25rem]',
                )}
              >
                <div
                  className={cn(
                    'absolute -top-5 left-1/2 z-10 flex',
                    'translate-x-[calc(-100%-73px)] gap-8',
                  )}
                >
                  <div className={cn('h-2 w-2 rounded-full bg-lime-300')} />
                  <div className={cn('h-2 w-2 rounded-full bg-lime-300')} />
                  <div className={cn('h-2 w-2 rounded-full bg-lime-300')} />
                </div>
                <span className={cn('text-blue-100')}>Ready GSM</span>과 함께 나에게 맞는
                <br />
                GSM을 직접 경험해보세요!
              </h1>
            </div>
          </div>

          <div
            className={cn(
              'absolute left-1/2 top-[70%] flex -translate-x-1/2',
              'flex-col items-center',
            )}
          >
            <div className={cn('animate-elegant-bounce mt-2')}>
              <button
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="특징으로 스크롤 이동"
                className={cn('flex flex-col items-center gap-[0.25rem]')}
              >
                <span className={cn('text-lg font-semibold text-white')}>GSM 더 알아보기</span>
                <Arrow />
              </button>
            </div>
          </div>

          <style jsx>{`
            @keyframes elegantBounce {
              0% {
                transform: translateY(0);
                opacity: 0.7;
              }
              50% {
                transform: translateY(12px);
                opacity: 1;
              }
              100% {
                transform: translateY(0);
                opacity: 0.7;
              }
            }
            .animate-elegant-bounce {
              animation: elegantBounce 2s ease-in-out infinite;
            }
          `}</style>
        </section>

        {/* 섹션 2 */}
        <section
          id="features"
          className={cn(
            'flex min-h-screen flex-col items-center justify-center',
            'bg-gray-50 px-4 py-20',
          )}
        >
          <div className={cn('text-center text-[2rem] font-normal leading-snug')}>
            <div>
              <span className={cn('relative inline-block')}>
                <div className={cn('absolute -top-4 left-1/2 z-10 flex', '-translate-x-1/2 gap-3')}>
                  <Dot color="#AFDB00" />
                </div>
                <span className={cn('text-lime-400')}>인성</span>
              </span>
              <span className={cn('text-blue-700')}>과 </span>
              <span className={cn('relative inline-block')}>
                <div className={cn('absolute -top-4 left-1/2 z-10 flex', '-translate-x-1/2 gap-3')}>
                  <Dot color="#AFDB00" />
                </div>
                <span className={cn('text-lime-400')}>감성</span>
              </span>
              <span className={cn('text-black')}>으로</span>{' '}
              <span className={cn('relative inline-block')}>
                <div className={cn('absolute -top-4 left-1/2 z-10 flex', '-translate-x-1/2 gap-3')}>
                  <Dot color="#3DAEFF" />
                </div>
                <span className={cn('text-blue-200')}>감동</span>
              </span>
              <span className={cn('text-black')}>을 만드는</span>
            </div>
            <div className={cn('mt-1')}>광주소프트웨어마이스터고등학교</div>
          </div>

          <div
            className={cn(
              'grid w-full max-w-6xl grid-cols-1 gap-3',
              'mobile-lg:grid-cols-2',
              'tablet:grid-cols-4',
            )}
          >
            <FeatureBox
              text={
                <>
                  AI 시대를 선도할
                  <br />
                  GSM 교육과정 운영
                </>
              }
              emoji="🎯"
            />

            <FeatureBox
              text={
                <>
                  직업군에 최적화된
                  <br />
                  취업역량 강화
                </>
              }
              emoji="💪"
            />

            <FeatureBox
              text={
                <>
                  산업수요 변화에 맞춘
                  <br />
                  현장실무능력 향상
                </>
              }
              emoji="💡"
            />

            <FeatureBox
              text={
                <>
                  자율설계와 자기 주도성으로
                  <br />
                  학습 능력 신장
                </>
              }
              emoji="🚀"
            />
          </div>
        </section>

        {/* 섹션 3 */}
        <div className={cn('bg-gray-50')}>
          <section className={cn('mx-auto', 'max-w-[75rem]', 'px-[1rem]', 'py-[8rem]')}>
            <div className={cn('mb-[3rem]', 'flex max-w-[37.5rem]', 'flex-col gap-[1rem]')}>
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
                'grid grid-cols-1 gap-[2rem] mobile:grid-cols-1 mobile-lg:grid-cols-2 tablet-sm:grid-cols-2 tablet:grid-cols-3',
              )}
            >
              <Feature
                imgSrc="/software.png"
                title="소프트웨어 개발과"
                tags={['운영체제', 'C', 'C++', 'JAVA', '네트워크', '모바일']}
                tagColor={{ bg: '#EFF6FF', text: '#0EA5E9' }}
                description="SW개발의 계획에서부터 분석, 설계, 코딩, 테스트링, 유지보수까지 전반적인 학습 / 맞춤형 실무교육을 통해 정보 시스템 개발과 웹/모바일, 콘텐츠 제작이 가능하도록 전문 인재 양성"
              />

              <Feature
                imgSrc="/iot.png"
                title="스마트 IOT(Internet Of Things)과"
                tags={['리눅스', '라즈베리파이', '아두이노', '하드웨어']}
                tagColor={{ bg: '#F7FEE7', text: '#4D7C0F' }}
                description="사물에 내장된 컴퓨터가 수행할 수 있는 소프트웨어개발 사물에 센서를 부착해 실시간으로 데이터를 인터넷으로 주고받는 기술인 IT융합 소프트웨어를 설계, 개발이 가능한 전문 인재를 양성"
              />

              <Feature
                imgSrc="/ai.png"
                title="인공지능(AI)과"
                tags={['빅데이터', '사물인터넷', '머신러닝', '딥러닝']}
                tagColor={{ bg: '#EFF6FF', text: '#0C4A6E' }}
                description="인공지능, 빅데이터, 사물인터넷을 바탕으로 한 인공지능 기반 기술을 교육하여 인공지능 서비스의 요구사항을 실현하기 위한 인공지능 플랫폼 구현, 인공지능 서비스 기획 전문 인재를 양성"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
