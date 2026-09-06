import { getOAuthUrl } from '@shared/entities/auth';

export const useLogin = () => {
  const saveReturnUrl = () => {
    const params = new URLSearchParams(window.location.search);
    sessionStorage.setItem('oauth_return_url', params.get('returnUrl') ?? '/');
  };

  const handleGoogleLogin = () => {
    saveReturnUrl();
    sessionStorage.setItem('oauth_provider', 'google');
    window.location.href = getOAuthUrl('google');
  };

  const handleKakaoLogin = () => {
    saveReturnUrl();
    sessionStorage.setItem('oauth_provider', 'kakao');
    window.location.href = getOAuthUrl('kakao');
  };

  return { handleGoogleLogin, handleKakaoLogin };
};
