'use client';

import { useEffect, useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { type ApiResponseType, get, userUrl } from '@shared/api';
import {
  getRedirectUri,
  type OAuthProviderType,
  usePostAuth,
  usePostSignOut,
} from '@shared/entities/auth';
import { checkIsAdmin, userQueryKeys, type UserType } from '@shared/entities/user';

export const useOauthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { mutate: postAuth } = usePostAuth();
  const { mutate: signOut } = usePostSignOut();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const code = searchParams.get('code');
    const provider = sessionStorage.getItem('oauth_provider') as OAuthProviderType | null;

    if (!code || !provider) {
      router.replace('/login');
      return;
    }

    postAuth(
      { provider, code, redirectUri: getRedirectUri() },
      {
        onSuccess: async () => {
          sessionStorage.removeItem('oauth_provider');
          const returnUrl = sessionStorage.getItem('oauth_return_url') ?? '/';
          sessionStorage.removeItem('oauth_return_url');

          const res = await queryClient.fetchQuery({
            queryKey: userQueryKeys.getMyInfo(),
            queryFn: () => get<ApiResponseType<UserType>>(userUrl.getMyInfo()),
          });

          if (checkIsAdmin(res.data?.role)) {
            toast.success('로그인 되었습니다.');
            router.replace(returnUrl);
            return;
          }

          toast.error('관리자 권한이 없는 계정입니다.');
          signOut(undefined, {
            onSettled: () => {
              queryClient.clear();
              router.replace('/login');
            },
          });
        },
        onError: () => {
          sessionStorage.removeItem('oauth_provider');
          sessionStorage.removeItem('oauth_return_url');
          toast.error('로그인에 실패했습니다.');
          router.replace('/login');
        },
      },
    );
  }, [postAuth, queryClient, router, searchParams, signOut]);
};
