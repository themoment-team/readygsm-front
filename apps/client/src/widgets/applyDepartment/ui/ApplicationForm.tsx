'use client';

import { Controller, useWatch } from 'react-hook-form';

import { CheckIcon } from '@shared/assets';
import { cn } from '@shared/lib';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/ui';

import { useApplicationForm } from '@/features/applyDepartment';
import { SearchSchoolModal } from '@/features/searchSchool';

const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');

  if (digits.startsWith('02')) {
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    if (digits.length <= 9) return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
  }

  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};

const GUARDIAN_RELATIONS = [
  { value: '부', label: '부' },
  { value: '모', label: '모' },
  { value: '기타', label: '기타(직접 입력)' },
] as const;

interface ApplicationFormProps {
  activityId: number;
  activityName: string;
  userId: number;
  onSuccess?: () => void;
}

const ApplicationForm = ({ activityId, activityName, userId, onSuccess }: ApplicationFormProps) => {
  const { form, isSchoolModalOpen, setIsSchoolModalOpen, handleSubmit } = useApplicationForm({
    activityId,
    activityName,
    userId,
    onSuccess,
  });
  const {
    register,
    control,
    setValue,
    trigger,
    formState: { isValid, errors },
  } = form;

  const guardianRelation = useWatch({ control, name: 'guardianRelation' });
  const agreed = useWatch({ control, name: 'agreed' });

  const handleSchoolSetValue: Parameters<typeof SearchSchoolModal>[0]['setValue'] = (
    fieldName,
    value,
    options,
  ) => {
    setValue(fieldName as 'schoolName' | 'schoolAddress', value as string, options);
  };

  return (
    <form onSubmit={handleSubmit} className={cn('flex w-full flex-col')}>
      <SearchSchoolModal
        isOpen={isSchoolModalOpen}
        onClose={() => setIsSchoolModalOpen(false)}
        setValue={handleSchoolSetValue}
      />

      <div className={cn('flex flex-col')}>
        <label className={cn('text-neutral-dark mb-1 text-sm leading-[1.4] font-medium')}>
          이름
        </label>
        <Input
          placeholder="이름을 입력해주세요"
          error={!!errors.name}
          {...register('name')}
          className={cn('w-full')}
        />
        <p className={cn('text-error-red min-h-4 text-xs leading-4 font-normal')}>
          {errors.name?.message}
        </p>
      </div>

      <div className={cn('flex flex-col')}>
        <label className={cn('text-neutral-dark mb-1 text-sm leading-[1.4] font-medium')}>
          학년 반 번호 입력
        </label>
        <div className={cn('flex w-full gap-2')}>
          <Controller
            name="grade"
            control={control}
            render={({ field }) => (
              <Select value={field.value ?? ''} onValueChange={field.onChange}>
                <SelectTrigger
                  className={cn(
                    'w-auto min-w-0 flex-1 overflow-hidden',
                    errors.grade && 'border-error-red hover:border-error-red',
                  )}
                >
                  <SelectValue placeholder="학년 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1학년</SelectItem>
                  <SelectItem value="2">2학년</SelectItem>
                  <SelectItem value="3">3학년</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <Controller
            name="classNum"
            control={control}
            render={({ field }) => (
              <Select value={field.value ?? ''} onValueChange={field.onChange}>
                <SelectTrigger
                  className={cn(
                    'w-auto min-w-0 flex-1 overflow-hidden',
                    errors.classNum && 'border-error-red hover:border-error-red',
                  )}
                >
                  <SelectValue placeholder="반 선택" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 20 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {i + 1}반
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <Input
            placeholder="번호 입력"
            error={!!errors.number}
            {...register('number')}
            className={cn('min-w-0 flex-1')}
          />
        </div>
        <p className={cn('text-error-red min-h-4 text-xs leading-4 font-normal')}>
          {errors.grade?.message ?? errors.classNum?.message ?? errors.number?.message}
        </p>
      </div>

      <div className={cn('flex flex-col')}>
        <label className={cn('text-neutral-dark mb-1 text-sm leading-5 font-medium')}>학교명</label>
        <div className={cn('flex w-full items-center gap-2')}>
          <Input
            placeholder="학교 찾기를 통해 내 학교명을 입력해주세요"
            error={!!errors.schoolName}
            {...register('schoolName')}
            readOnly
            className={cn('flex-1')}
          />
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => setIsSchoolModalOpen(true)}
          >
            학교 찾기
          </Button>
        </div>
        <p className={cn('text-error-red min-h-4 text-xs leading-4 font-normal')}>
          {errors.schoolName?.message}
        </p>
      </div>

      <div className={cn('flex flex-col')}>
        <label className={cn('text-neutral-dark mb-1 text-sm leading-[1.4] font-medium')}>
          전화번호
        </label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="전화번호를 입력해주세요."
              error={!!errors.phone}
              value={field.value}
              onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
              className={cn('w-full')}
            />
          )}
        />
        <p className={cn('text-error-red min-h-4 text-xs leading-4 font-normal')}>
          {errors.phone?.message}
        </p>
      </div>

      <div className={cn('flex flex-col')}>
        <label className={cn('text-neutral-dark mb-1 text-sm leading-[1.4] font-medium')}>
          보호자 전화번호
        </label>
        <Controller
          name="guardianPhone"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="전화번호를 입력해주세요."
              error={!!errors.guardianPhone}
              value={field.value}
              onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
              className={cn('w-full')}
            />
          )}
        />
        <p className={cn('text-error-red min-h-4 text-xs leading-4 font-normal')}>
          {errors.guardianPhone?.message}
        </p>
      </div>

      <div className={cn('flex flex-col')}>
        <p className={cn('text-neutral-dark mb-3 text-sm leading-5 font-medium')}>보호자 관계</p>
        <Controller
          name="guardianRelation"
          control={control}
          render={({ field }) => (
            <div className={cn('flex items-center gap-10')}>
              {GUARDIAN_RELATIONS.map(({ value, label }) => (
                <label key={value} className={cn('flex cursor-pointer items-center gap-2')}>
                  <input
                    type="radio"
                    name="guardianRelation"
                    value={value}
                    className={cn('sr-only')}
                    checked={field.value === value}
                    onChange={() => field.onChange(value)}
                  />
                  <div
                    className={cn(
                      'flex size-4 items-center justify-center rounded-full border-2',
                      field.value === value
                        ? 'border-brand-primary'
                        : 'border-border-variant bg-pure-white',
                    )}
                  >
                    {field.value === value && (
                      <div className={cn('bg-brand-primary size-1.5 rounded-full')} />
                    )}
                  </div>
                  <span className={cn('text-neutral-dark text-sm leading-5 font-medium')}>
                    {label}
                  </span>
                </label>
              ))}
            </div>
          )}
        />
        {guardianRelation === '기타' && (
          <Input
            placeholder="보호자 관계를 직접 입력해주세요"
            error={!!errors.customGuardianRelation}
            {...register('customGuardianRelation')}
            className={cn('mt-3 w-full')}
          />
        )}
        <p className={cn('text-error-red min-h-4 text-xs leading-4 font-normal')}>
          {guardianRelation === '기타'
            ? errors.customGuardianRelation?.message
            : errors.guardianRelation?.message}
        </p>
      </div>

      <label className={cn('flex cursor-pointer items-center gap-2 py-3')}>
        <input type="checkbox" {...register('agreed')} className={cn('sr-only')} />
        <div
          className={cn(
            'flex size-4.5 shrink-0 items-center justify-center rounded border',
            agreed
              ? 'border-brand-primary bg-brand-primary'
              : 'border-border-variant bg-pure-white',
          )}
        >
          {agreed && <CheckIcon />}
        </div>
        <span className={cn('text-cool-neutral text-sm leading-5')}>
          [필수] 개인정보 수집 및 이용에 동의합니다.
        </span>
      </label>

      <div
        className={cn('w-full', !isValid && 'cursor-not-allowed')}
        onClick={!isValid ? () => trigger() : undefined}
      >
        <Button
          type="submit"
          variant={isValid ? 'default' : 'neutral'}
          size="full"
          className={cn(!isValid && 'pointer-events-none')}
        >
          학과 체험 신청
        </Button>
      </div>
    </form>
  );
};

export default ApplicationForm;
