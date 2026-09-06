import { useQuery } from '@tanstack/react-query';

import { type ApiResponseType, get, userUrl } from '@shared/api';

import type { UserType } from '../model/types';

export const userQueryKeys = {
  getMyInfo: () => ['user', 'me'] as const,
} as const;

export const useGetMyInfo = () =>
  useQuery({
    queryKey: userQueryKeys.getMyInfo(),
    queryFn: () => get<ApiResponseType<UserType>>(userUrl.getMyInfo()),
    select: (res) => res.data,
    retry: false,
  });
