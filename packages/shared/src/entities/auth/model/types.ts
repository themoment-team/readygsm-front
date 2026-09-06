export type OAuthProviderType = 'google' | 'kakao';

export interface PostAuthBodyType {
  code: string;
  redirectUri: string;
}
