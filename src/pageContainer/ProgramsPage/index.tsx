'use client';

import { useState } from 'react';

import { Arrow } from '@/asset';
import { RegisterCard } from '@/components';
import { RegisterStatus } from '@/components/RegisterCard';
import { cn } from '@/lib/utils';

type RegisterData = {
  id: number;
  title: string;
  status: RegisterStatus;
};

const ProgramsPage = () => {
  const responseData: RegisterData[] = [
    { id: 1, title: 'AI와 이미지 인식', status: 'OPEN' },
    { id: 2, title: '딥러닝 기초', status: 'cancelled' },
    { id: 3, title: '머신러닝 실습', status: 'CLOSED' },
    { id: 4, title: '머신러닝 실습', status: 'UPCOMING' },
  ];

  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);

  const handleScheduleOpen = () => {
    setIsScheduleOpen((e) => !e);
  };

  const textStyle = ['text-center', 'text-[1.125rem]', 'font-normal', 'not-italic', 'leading-8'];

  return (
    <div
      className={cn(
        'flex',
        'px-[16rem]',
        'items-center',
        'justify-center',
        'gap-16',
        'pt-[7.87rem]',
        'flex-col',
      )}
    >
      <div className={cn('flex', 'justify-start', 'w-full')}>
        <p
          className={cn(textStyle, 'text-[1.75rem]', 'font-medium', 'not-italic', 'leading-normal')}
        >
          학과체험
        </p>
      </div>
      <div className={cn('flex', 'flex-col', 'w-full', 'gap-4', 'justify-between')}>
        <div
          className={cn(
            'flex',
            'justify-between',
            'w-full',
            'pb-4',
            'items-center',
            'border-solid',
            'border-b-[1px]',
            'border-gray',
          )}
        >
          <p
            className={cn(
              textStyle,
              'text-[1.75rem]',
              'font-medium',
              'not-italic',
              'leading-normal',
            )}
          >
            학과체험 일정
          </p>
          <div
            onClick={handleScheduleOpen}
            className={cn([
              isScheduleOpen ? 'rotate-180' : '',
              'flex',
              'align-center',
              'justify-center',
              'transition-all',
            ])}
          >
            <Arrow />
          </div>
        </div>
        <div
          className={cn(
            'overflow-hidden',
            'transition-[max-height,padding]',
            'duration-500',
            'ease-in-out',
            isScheduleOpen ? 'max-h-[44rem] pt-12' : 'max-h-0 pt-0',
            'w-full',
            'max-w-[88rem]',
            'flex',
            'flex-col',
            'gap-4',
            textStyle,
          )}
        >
          <div className={cn('grid', 'grid-cols-12', 'gap-4', 'h-10', textStyle)}>
            <div
              className={cn(
                'col-span-8',
                'flex',
                'items-center',
                'justify-center',
                'rounded-lg',
                'bg-blue-600',
                'py-2',
                'text-white',
                textStyle,
              )}
            >
              활동 및 시간
            </div>
            <div
              className={cn(
                'col-span-4',
                'flex',
                'items-center',
                'justify-center',
                'rounded-lg',
                'bg-blue-600',
                'py-2',
                'text-white',
                textStyle,
              )}
            >
              장소
            </div>
          </div>
          <div className={cn('grid', 'grid-cols-12', 'gap-4', 'h-16')}>
            <div
              className={cn(
                'col-span-2',
                'flex',
                'items-center',
                'justify-center',
                'rounded-lg',
                'bg-blue-600',
                'py-2',
                'text-white',
                textStyle,
              )}
            >
              등록 및 안내
            </div>
            <div
              className={cn(
                'col-span-6',
                'flex',
                'items-center',
                'justify-center',
                'rounded-lg',
                'border',
                'bg-white',
                'py-2',
                'border',
                'rounded-lg',
                'border-gray',
                'border-solid',
                textStyle,
              )}
            >
              09:00 ~ 09:30
            </div>
            <div
              className={cn(
                'col-span-4',
                'flex',
                'items-center',
                'justify-center',
                'rounded-lg',
                'border',
                'bg-white',
                'py-2',
                'border',
                'rounded-lg',
                'border-gray',
                'border-solid',
                textStyle,
              )}
            >
              금봉관 1층 시청각실
            </div>
          </div>
          <div className={cn('grid', 'grid-cols-12', 'gap-4', 'h-96')}>
            <div
              className={cn(
                'col-span-2',
                'flex',
                'items-center',
                'justify-center',
                'rounded-lg',
                'bg-blue-600',
                'py-2',
                'text-white',
                'border',
                'rounded-lg',
                textStyle,
              )}
            >
              체험 프로그램 진행
            </div>
            <div
              className={cn(
                'col-span-6',
                'flex',
                'flex-col',
                'items-center',
                'justify-center',
                'rounded-lg',
                'border',
                'bg-white',
                'py-2',
                'border',
                'rounded-lg',
                'border-gray',
                'border-solid',
                textStyle,
              )}
            >
              <div className={cn('flex', 'flex-col')}>
                <div className={cn(textStyle)}>1교시 09:30~10:15</div>
                <div className={cn(textStyle)}>2교시 10:25~11:10</div>
                <div className={cn(textStyle)}>3교시 11:20~12:05</div>
              </div>
            </div>
            <div
              className={cn(
                'col-span-4',
                'flex',
                'items-center',
                'justify-center',
                'rounded-lg',
                'border',
                'bg-white',
                'py-2',
                'border',
                'rounded-lg',
                'border-gray',
                'border-solid',
                textStyle,
              )}
            >
              프로그램별 3시간 수업
            </div>
          </div>
          <div className={cn('grid', 'grid-cols-12', 'gap-4', 'h-32')}>
            <div
              className={cn(
                'col-span-2',
                'flex',
                'items-center',
                'justify-center',
                'rounded-lg',
                'bg-blue-600',
                'py-2',
                'text-white',
                textStyle,
              )}
            >
              간식 배부 및 학과 설명
            </div>
            <div
              className={cn(
                'col-span-6',
                'flex',
                'items-center',
                'justify-center',
                'rounded-lg',
                'border',
                'bg-white',
                'py-2',
                'border-solid',
                'rounded-lg',
                'border-gray',
                textStyle,
              )}
            >
              12:05~13:00
            </div>
            <div
              className={cn(
                'col-span-4',
                'flex',
                'items-center',
                'justify-center',
                'rounded-lg',
                'border',
                'bg-white',
                'py-2',
                'border-solid',
                'rounded-lg',
                'border-gray',
                textStyle,
              )}
            >
              금봉관 1층 시청각실
            </div>
          </div>
        </div>
      </div>

      <div className={cn('gap-8', 'flex', 'flex-col', 'w-full')}>
        {responseData.map((x, index) => (
          <RegisterCard key={index} status={x.status} isGrade={true} />
        ))}
      </div>

      <div className={cn('flex', 'justify-start', 'w-full')}>
        <p
          className={cn(textStyle, 'text-[1.75rem]', 'font-medium', 'not-italic', 'leading-normal')}
        >
          입학 설명회
        </p>
      </div>
      <div className={cn('gap-8', 'flex', 'flex-col', 'w-full')}>
        {responseData.map((x, index) => (
          <RegisterCard key={index} status={x.status} isGrade={false} />
        ))}
      </div>
    </div>
  );
};

export default ProgramsPage;
