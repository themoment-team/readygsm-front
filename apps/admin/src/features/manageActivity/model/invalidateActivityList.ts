import type { QueryClient } from '@tanstack/react-query';

import { activityQueryKeys, revalidateActivityList } from '@shared/entities/activity';

export const invalidateActivityList = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: activityQueryKeys.getActivityList() });
  revalidateActivityList();
};
