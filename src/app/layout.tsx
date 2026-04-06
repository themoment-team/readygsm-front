import type { Metadata } from 'next';

import { TanStackProvider } from '@/shared/lib';
import { pretendard } from '@/shared/styles';
import { Header } from '@/widgets/header';

import '@/shared/styles/globals.css';

export const metadata: Metadata = {
  title: 'Ready, GSM',
  description: '광주소프트웨어마이스터고 학과체험 신청 서비스',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <TanStackProvider>
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
};

export default RootLayout;
