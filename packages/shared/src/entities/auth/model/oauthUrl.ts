import type { OAuthProviderType } from './types';

export const getRedirectUri = () => `${window.location.origin}/oauth/callback`;

export const getOAuthUrl = (provider: OAuthProviderType): string => {
  const redirectUri = getRedirectUri();

  if (provider === 'google') {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'email profile',
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  }

  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
    redirect_uri: redirectUri,
    response_type: 'code',
  });
  return `https://kauth.kakao.com/oauth/authorize?${params}`;
};
