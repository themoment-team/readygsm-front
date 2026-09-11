import { useMutation, useQueryClient } from '@tanstack/react-query';

import { del } from '@shared/api';
import { activityQueryKeys } from '@shared/entities/activity';
import { revalidateActivityList } from '@shared/entities/activity/index.server';

export const cancelApplyUrl = {
  deleteApply: () => '/v1/application/cancel',
} as const;

const useDeleteApply = (userId: number, activityId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => del(cancelApplyUrl.deleteApply(), { params: { userId, activityId } }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: activityQueryKeys.getActivityList() });
      await revalidateActivityList();
    },
  });
};

export const useCancelApply = (userId: number, activityId: number) => {
  const { mutate: cancelApply, isPending } = useDeleteApply(userId, activityId);
  return { cancelApply, isPending };
};
