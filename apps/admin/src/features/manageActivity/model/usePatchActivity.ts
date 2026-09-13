import { useMutation, useQueryClient } from '@tanstack/react-query';

import { activityUrl, patch } from '@shared/api';

import { invalidateActivityList } from './invalidateActivityList';
import type { toActivityWithRegistrationReqDto } from './types';

type ActivityReqDto = ReturnType<typeof toActivityWithRegistrationReqDto>;

const usePatchActivityMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: ActivityReqDto) => patch(activityUrl.patchActivity(id), dto),
    onSuccess: () => invalidateActivityList(queryClient),
  });
};

export const usePatchActivity = (id: number) => {
  const { mutate: patchActivity, isPending } = usePatchActivityMutation(id);
  return { patchActivity, isPending };
};
