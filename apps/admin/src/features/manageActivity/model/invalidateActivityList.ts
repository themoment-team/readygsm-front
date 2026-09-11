import type { QueryClient } from '@tanstack/react-query';

import { activityQueryKeys } from '@shared/entities/activity';
import { revalidateActivityList } from '@shared/entities/activity/index.server';

export const invalidateActivityList = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: activityQueryKeys.getActivityList() });
  revalidateActivityList();
};
