import { useMutation, useQueryClient } from '@tanstack/react-query';

import { activityUrl, del } from '@shared/api';

import { invalidateActivityList } from './invalidateActivityList';

const useDeleteActivityMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => del(activityUrl.deleteActivity(id)),
    onSuccess: () => invalidateActivityList(queryClient),
  });
};

export const useDeleteActivity = (id: number) => {
  const { mutate: deleteActivity, isPending } = useDeleteActivityMutation(id);
  return { deleteActivity, isPending };
};
