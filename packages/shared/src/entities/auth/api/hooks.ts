import { useMutation } from '@tanstack/react-query';

import { authUrl, post } from '@shared/api';

import type { OAuthProviderType, PostAuthBodyType } from '../model/types';

export const usePostSignOut = () =>
  useMutation({
    mutationFn: () => post<void>(authUrl.postSignOut()),
  });

export const usePostAuth = () =>
  useMutation({
    mutationFn: ({ provider, ...body }: PostAuthBodyType & { provider: OAuthProviderType }) =>
      post<void>(authUrl.postAuth(provider), body),
  });
