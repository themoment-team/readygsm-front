import { useMutation, useQueryClient } from '@tanstack/react-query';

import { applicationUrl, del } from '@shared/api';
import { activityQueryKeys } from '@shared/entities/activity';
import { revalidateActivityList } from '@shared/entities/activity/index.server';
import { applicationQueryKeys } from '@shared/entities/application';

export const useDeleteApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => del<void>(applicationUrl.deleteApplication(id)),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: applicationQueryKeys.allAdminApplications() });
      queryClient.invalidateQueries({ queryKey: activityQueryKeys.getActivityList() });
      await revalidateActivityList();
    },
  });
};
