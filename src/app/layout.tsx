import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Ready, GSM",
  description:
    "Ready, GSM은 광주소프트웨어마이스터고 학과체험 및 입학설명회 신청 서비스입니다",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
