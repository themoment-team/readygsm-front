'use client';

import React, { useEffect, useState } from 'react';

import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { ExperiencesFormValues } from '@/types';

import { SearchDialog } from '..';

interface MemberInputGroupProps {
  index: number;
  register: UseFormRegister<ExperiencesFormValues>;
  fieldId: string;
  setValue: UseFormSetValue<ExperiencesFormValues>;
}

const InputExperiences: React.FC<MemberInputGroupProps> = ({
  index,
  register,
  fieldId,
  setValue,
}) => {
  const [school, setSchool] = useState<string>('');

  useEffect(() => {
    setValue(`members.${index}.school`, school);
  }, [school, setValue, index]);

  return (
    <div
      key={fieldId}
      className={cn(
        'w-full',
        'rounded-lg',
        'border',
        'border-gray-200',
        'bg-white',
        'gap-4',
        'flex',
        'flex-col',
      )}
    >
      <div className={cn('flex', 'flex-col', 'gap-1')}>
        <p className={cn('text-sm', 'font-medium', 'leading-5', 'mb-1')}>이름</p>
        <input
          {...register(`members.${index}.name` as const)}
          placeholder="이름을 입력해주세요"
          className={cn(
            'w-full',
            'h-10',
            'px-3',
            'py-2',
            'border',
            'border-solid',
            'border-gray-300',
            'rounded-md',
            'focus:outline-none',

            'placeholder:text-gray-400',
            'text-sm',
          )}
        />
      </div>
      <div className={cn('flex', 'flex-col', 'gap-1')}>
        <p className={cn('text-sm', 'font-medium', 'leading-5', 'mb-1')}>전화번호</p>
        <input
          {...register(`members.${index}.phone` as const)}
          placeholder="전화번호를 입력해주세요(ex. 01012345678)"
          className={cn(
            'w-full',
            'h-10',
            'px-3',
            'py-2',
            'border',
            'border-solid',
            'border-gray-300',
            'rounded-md',
            'focus:outline-none',

            'placeholder:text-gray-400',
            'text-sm',
          )}
        />
      </div>
      <div className={cn('flex', 'flex-col', 'gap-1')}>
        <p className={cn('text-sm', 'font-medium', 'leading-5', 'mb-1')}>학교</p>
        <div className={cn('flex', 'gap-2')}>
          <input
            {...register(`members.${index}.school`)}
            value={school}
            readOnly
            tabIndex={-1}
            onFocus={(e) => e.target.blur()}
            placeholder="내 중학교 학교 찾기"
            className={cn(
              'flex-1',
              'h-10',
              'px-3',
              'py-2',
              'border',
              'border-solid',
              'border-gray-300',
              'rounded-md',
              'focus:outline-none',
              'placeholder:text-gray-400',
              'text-sm',
              'cursor-not-allowed',
            )}
          />
          <SearchDialog setValue={setSchool} />
        </div>
      </div>
      <div className={cn('flex', 'flex-col', 'gap-1', 'pb-8')}>
        <p className={cn('text-sm', 'font-medium', 'leading-5', 'mb-1')}>학번</p>
        <div className={cn('flex', 'gap-2')}>
          <input
            {...register(`members.${index}.grade.grade` as const)}
            placeholder="학년"
            className={cn(
              'w-1/3',
              'h-10',
              'px-3',
              'py-2',
              'border',
              'border-solid',
              'border-gray-300',
              'rounded-md',
              'placeholder:text-gray-400',
              'text-sm',
            )}
          />
          <input
            {...register(`members.${index}.grade.class` as const)}
            placeholder="반"
            className={cn(
              'w-1/3',
              'h-10',
              'px-3',
              'py-2',
              'border',
              'border-solid',
              'border-gray-300',
              'rounded-md',
              'placeholder:text-gray-400',
              'text-sm',
            )}
          />
          <input
            {...register(`members.${index}.grade.number` as const)}
            placeholder="번"
            className={cn(
              'w-1/3',
              'h-10',
              'px-3',
              'py-2',
              'border',
              'border-solid',
              'border-gray-300',
              'rounded-md',
              'placeholder:text-gray-400',
              'text-sm',
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default InputExperiences;
