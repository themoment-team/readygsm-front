import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getApiErrorMessage, getApiErrorStatus } from '@shared/api';
import { activityQueryKeys, revalidateActivityList } from '@shared/entities/activity';
import { usePostApplication } from '@shared/entities/application';

import { trackEvent } from '@/shared/lib';

import { ApplicationFormSchema, type ApplicationFormType } from './schema';

/** 활동의 신청 가능 상태가 서버에서 이미 바뀌었을 수 있는 응답 코드 (409: 이미 신청/기간 아님, 404: 활동 삭제) */
const STALE_ACTIVITY_STATUSES = [404, 409];

interface UseApplicationFormOptions {
  activityId: number;
  activityName: string;
  userId: number;
  onSuccess?: () => void;
}

export const useApplicationForm = ({
  activityId,
  activityName,
  userId,
  onSuccess,
}: UseApplicationFormOptions) => {
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: postApplication } = usePostApplication();

  const activityParams = { activity_id: activityId, activity_name: activityName };

  const form = useForm<ApplicationFormType>({
    resolver: zodResolver(ApplicationFormSchema),
    defaultValues: {
      name: '',
      grade: undefined,
      classNum: undefined,
      number: '',
      schoolName: '',
      schoolAddress: '',
      phone: '',
      guardianPhone: '',
      guardianRelation: undefined,
      customGuardianRelation: '',
      agreed: false,
    },
    mode: 'onChange',
  });

  const handleSubmit = form.handleSubmit((data) => {
    trackEvent('apply_submit', activityParams);

    postApplication(
      {
        userId,
        activityId,
        name: data.name,
        grade: Number(data.grade),
        classNumber: Number(data.classNum),
        number: Number(data.number),
        schoolName: data.schoolName,
        phoneNumber: data.phone,
        familyPhoneNumber: data.guardianPhone,
      },
      {
        onSuccess: async () => {
          trackEvent('apply_success', activityParams);
          queryClient.invalidateQueries({ queryKey: activityQueryKeys.getActivityList() });
          await revalidateActivityList();
          toast.success('학과 체험 신청이 완료되었습니다.');
          onSuccess?.();
        },
        onError: async (error) => {
          const status = getApiErrorStatus(error);

          trackEvent('apply_error', { ...activityParams, status: status ?? 'unknown' });

          if (status !== undefined && STALE_ACTIVITY_STATUSES.includes(status)) {
            queryClient.invalidateQueries({ queryKey: activityQueryKeys.getActivityList() });
            await revalidateActivityList();
          }
          toast.error(getApiErrorMessage(error, '신청 중 오류가 발생했습니다.'));
        },
      },
    );
  });

  return {
    form,
    isSchoolModalOpen,
    setIsSchoolModalOpen,
    handleSubmit,
  };
};
