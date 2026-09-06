import type { Metadata } from 'next';

import { LoginPage } from '@/views/login';

export const metadata: Metadata = {
  title: '로그인',
};

const Login = () => <LoginPage />;

export default Login;
