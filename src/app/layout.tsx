import type { Metadata } from "next";

import "@/styles/globals.css";

import Provider from "./provider";

export const metadata: Metadata = {
  title: "Ready, GSM",
  description:
    "Ready, GSM은 광주소프트웨어마이스터고 학과체험 및 입학설명회 신청 서비스입니다.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="ko">
    <body>
      <Provider>{children}</Provider>
    </body>
  </html>
);

export default RootLayout;
