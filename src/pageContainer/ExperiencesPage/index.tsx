'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import { CircleIcon, CrossIcon } from '@/assets';
import { InputExperiences, PersonalInfo } from '@/components';
import { cn } from '@/lib/utils';
import { formSchema } from '@/schemas/experiencesInput';
import { ExperiencesFormValues } from '@/types';

const ExperiencesPage = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPersonalAgree, setIsPersonalAgree] = useState<boolean>(false);

  const { register, control, handleSubmit, setValue, watch } = useForm<ExperiencesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      members: [
        {
          name: '',
          phone: '',
          grade: {
            grade: '',
            class: '',
            number: '',
          },
          school: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  });

  const onSubmit = (data: ExperiencesFormValues) => {
    console.log(data);
  };

  // 모든 input이 비어있지 않은지 확인
  const isAllFilled = fields.every((_, idx) => {
    const member = watch(`members.${idx}`);
    return (
      member &&
      member.name &&
      member.phone &&
      member.school &&
      member.grade &&
      member.grade.grade &&
      member.grade.class &&
      member.grade.number
    );
  });

  useEffect(() => {
    if (currentIndex >= fields.length) {
      setCurrentIndex(fields.length - 1);
    }
  }, [fields.length, currentIndex]);

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  return (
    <div
      className={cn(
        'bg-bgDefault',
        'px-[33%]',
        'py-16',
        'w-full',
        'flex',
        'justify-center',
        'items-center',
      )}
    >
      <div
        className={cn(
          'w-[41rem]',
          'bg-white',
          'rounded-2xl',
          'py-12',
          'pl-24',
          'pr-8',
          'flex',
          'gap-8',
        )}
      >
        <div className={cn('w-[41rem]', 'h-[52rem]')}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn('flex', 'flex-col', 'gap-10', 'items-center', 'w-96')}
          >
            <div className={cn('flex', 'justify-center', 'flex-col', 'items-center', 'gap-2')}>
              <p
                className={cn(
                  'text-[1.5rem]',
                  'font-semibold',
                  'leading-[2rem]',
                  'tracking-[-0.009rem]',
                  'not-italic',
                )}
              >
                학과체험 신청서
              </p>
              <p className={cn('text-[0.875rem]', 'leading-[1.25rem]', 'text-[#7E8490]')}>
                프로그램명: 이미지 인식 궁금하긴해~ 해볼만해~ 할래말래할래말래
              </p>
            </div>
            <div className={cn('w-96')}>
              {fields.map((x, index) =>
                index === currentIndex ? (
                  <InputExperiences
                    key={x.id}
                    index={index}
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    fieldId={x.id}
                  />
                ) : null,
              )}
            </div>
            <PersonalInfo checked={isPersonalAgree} setState={setIsPersonalAgree} />
            <button
              type="submit"
              className={cn(
                'flex',
                'justify-center',
                'items-center',
                'rounded-lg',
                'bg-gray-100',
                'w-full',
                'h-[3.25rem]',
                !(isAllFilled && isPersonalAgree) ? 'cursor-not-allowed opacity-50' : '',
              )}
              disabled={!(isAllFilled && isPersonalAgree)}
            >
              완료
            </button>
          </form>
        </div>
        <div className={cn('pt-8', 'flex', 'flex-col', 'gap-2')}>
          <button
            onClick={() =>
              append({
                name: '',
                phone: '',
                grade: {
                  grade: '',
                  class: '',
                  number: '',
                },
                school: '',
              })
            }
            className={cn(
              'w-[7.5rem]',
              'py-2',
              'px-3',
              'flex',
              'items-center',
              'gap-2',
              'bg-gray-50',
              'rounded-md',
            )}
          >
            <CrossIcon />
            <p className={cn('text-blue-600')}>인원 추가</p>
          </button>
          <div>
            {fields.map((x, index) => {
              return (
                <button
                  key={index}
                  className={cn(
                    'flex',
                    'w-[7.5rem]',
                    'py-2',
                    'px-3',
                    'flex',
                    'items-center',
                    'gap-2',
                    'rounded-md',
                    index === currentIndex ? 'bg-blue-50' : 'bg-none',
                  )}
                >
                  {index === 0 ? (
                    <CircleIcon
                      key={index}
                      color={index === currentIndex ? '#3B82F6' : '#E5E7EB'}
                    />
                  ) : (
                    <div className={cn('rotate-45')} onClick={() => remove(index)}>
                      <CrossIcon
                        key={index}
                        color={index === currentIndex ? '#3B82F6' : '#E5E7EB'}
                      />
                    </div>
                  )}
                  <p
                    onClick={() => setCurrentIndex(index)}
                    className={cn([
                      index === currentIndex ? 'text-blue-500' : 'text-gray-500',
                      'text-sm',
                      'font-medium',
                      'leading-5',
                      'not-italic',
                    ])}
                  >
                    {watch(`members.${index}.name`) !== ''
                      ? watch(`members.${index}.name`)
                      : `사용자 ${index + 1}`}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencesPage;
