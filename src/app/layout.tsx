import type { Metadata } from 'next';

import { TanStackProvider } from '@/shared/lib';
import { pretendard } from '@/shared/styles';

import '@/shared/styles/globals.css';
export const metadata: Metadata = {
  title: 'project-title',
  description: 'project-description',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
};

export default RootLayout;
