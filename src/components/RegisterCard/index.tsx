'use client';

import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

export type RegisterStatus = 'OPEN' | 'cancelled' | 'CLOSED' | 'UPCOMING';

export const RegisterStatusEnum = {
  예약: 'OPEN' as const,
  취소: 'cancelled' as const,
  신청불가: ['CLOSED', 'UPCOMING'] as const,
} as const;

export type RegisterCardProps = {
  status: RegisterStatus;
  isGrade: boolean;
};

const RegisterCard = ({ status, isGrade }: RegisterCardProps) => {
  const [borderColor, setBorderColor] = useState<string>('');
  const [registerBtn, setRegisterBtn] = useState<string>('');

  const { mutate, isPending } = useMutation({
    mutationFn: async (): Promise<string> => {
      //   const response = await get<ReservationResponse>('/reservation');
      //   return response;

      return 'string';
    },
    onSuccess: () => {
      // 예약 성공 처리
      toast.success('등록되었습니다!');
    },
    onError: () => {
      // 예약 실패 처리
    },
  });

  useEffect(() => {
    if (status === RegisterStatusEnum.예약) {
      setBorderColor('border-green');
      setRegisterBtn('예약하기');
    } else if (status === RegisterStatusEnum.취소) {
      setBorderColor('border-red');
      setRegisterBtn('취소하기');
    } else if (status === 'CLOSED' || status === 'UPCOMING') {
      setBorderColor('border-gray');
      setRegisterBtn('신청불가');
    }
  }, [status]);

  return (
    <div
      className={cn(
        'w-full',
        'h-[15.4375]',
        'flex',
        'items-center',
        'justify-center',
        'p-8',
        'border-solid',
        'border',
        'border-gray',
        'rounded-2xl',
        'bg-[#FAFAFA]',
      )}
    >
      <div className={cn('w-full', 'gap-6', 'flex', 'justify-between')}>
        <div className={cn('gap-2', 'flex', 'gap-6', 'flex-col')}>
          <div className={cn('flex', 'gap-2', 'flex-col')}>
            <div
              className={cn(
                'h-[1.6875rem]',
                'px-[1rem]',
                'rounded-lg',
                'border-solid',
                'border-2',
                'border-main',
                'w-fit',
                'h-fit',
                'text-base',
                'font-normal',
                'leading-normal',
                'not-italic',
              )}
            >
              {isGrade ? '인공지능(AI)과' : '입학 설명회'}
            </div>
            <div className={cn('flex', 'gap-1', 'flex-col')}>
              <div
                className={cn([
                  'text-[1.25rem]',
                  'font-normal',
                  'leading-normal',
                  'text-black',
                  isGrade ? 'block' : 'hidden',
                ])}
              >
                이미지 인식 궁금하긴해~ 해볼만해~ 할래말래할래말래
              </div>
              <div
                className={cn(
                  'text-[1.25rem]',
                  'font-normal',
                  'not-italic',
                  'leading-normal',
                  'text-[#4F4F51]',
                )}
              >
                신청 인원:14/15
              </div>
            </div>
          </div>
          <div
            className={cn(
              'text-[1.25rem]',
              'font-normal',
              'not-italic',
              'leading-normal',
              'text-[#4F4F51]',
            )}
          >
            일시:0월 00일 오전 00시
          </div>
          <div
            className={cn(
              'text-[1.25rem]',
              'font-normal',
              'not-italic',
              'leading-normal',
              'text-[#4F4F51]',
            )}
          >
            장소:동행관 1층 AI프로그래밍실
          </div>
        </div>
      </div>
      <div className={cn('flex', 'h-[13rem]', 'flex-col', 'justify-end')}>
        <button
          disabled={isPending}
          onClick={status === RegisterStatusEnum.예약 ? () => mutate() : undefined}
          className={cn(
            'px-4',
            'py-2',
            'w-40',
            'h-fit',
            'border-solid',
            'border',
            borderColor,
            'rounded-lg',
          )}
        >
          <p className="text-center text-xl font-normal not-italic leading-normal">
            {isPending ? '등록중입니다' : registerBtn}
          </p>
        </button>
      </div>
    </div>
  );
};

export default RegisterCard;
