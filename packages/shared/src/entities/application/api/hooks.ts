import { useMutation, useQuery } from '@tanstack/react-query';

import { type ApiResponseType, applicationUrl, get, post } from '@shared/api';

import type { ApplicationType, PostApplicationMutationInput } from '../model/types';

export const applicationQueryKeys = {
  allAdminApplications: () => ['application', 'admin', 'list'] as const,
  getAllApplications: (activityId: number) =>
    ['application', 'admin', 'list', { activityId }] as const,
} as const;

export const usePostApplication = () =>
  useMutation({
    mutationFn: ({ userId, activityId, ...body }: PostApplicationMutationInput) =>
      post<ApiResponseType<ApplicationType>>(applicationUrl.postApplication(), body, {
        params: { userId, activityId },
      }),
  });

export const useGetAdminApplications = (activityId: number | null) =>
  useQuery({
    queryKey: applicationQueryKeys.getAllApplications(activityId ?? 0),
    queryFn: () =>
      get<ApiResponseType<ApplicationType[]>>(applicationUrl.getAllApplications(activityId!)),
    select: (res) => res.data,
    enabled: activityId !== null,
  });

export const useDownloadApplicationExcel = () =>
  useMutation({
    mutationFn: async (activityId: number) => {
      const blob = await get<Blob>(applicationUrl.getExcel(activityId), { responseType: 'blob' });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'applications.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
  });
