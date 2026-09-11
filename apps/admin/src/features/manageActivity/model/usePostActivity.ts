import { useMutation, useQueryClient } from '@tanstack/react-query';

import { activityUrl, post } from '@shared/api';

import { invalidateActivityList } from './invalidateActivityList';
import type { toActivityFirstCreateReqDto, toActivityWithRegistrationReqDto } from './types';

type ActivityReqDto =
  | ReturnType<typeof toActivityFirstCreateReqDto>
  | ReturnType<typeof toActivityWithRegistrationReqDto>;

const usePostActivityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: ActivityReqDto) => post(activityUrl.postActivity(), dto),
    onSuccess: () => invalidateActivityList(queryClient),
  });
};

export const usePostActivity = () => {
  const { mutate: postActivity, isPending } = usePostActivityMutation();
  return { postActivity, isPending };
};
