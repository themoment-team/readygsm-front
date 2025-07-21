'use client';

import Logo from '@/asset/logo';

const Footer = () => {
  return (
    <footer className="bg-[#EEEFEF] px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
        <div className="mt-6 flex flex-col items-center justify-center sm:items-start">
          <Logo />
        </div>

        <div className="text-gray-600 space-y-2 text-right text-sm sm:text-right">
          <div className="text-base font-semibold text-[#121212]">
            광주소프트웨어마이스터고등학교
          </div>
          <div className="flex justify-center gap-6 text-[13px] sm:justify-end">
            <a href="#" className="hover:underline">
              홈페이지
            </a>
            <a href="#" className="hover:underline">
              찾아오시는 길
            </a>
            <a href="#" className="hover:underline">
              교내 배치도
            </a>
          </div>

          <div className="h-6" />

          <div className="text-[12px] leading-5 text-[#666666]">
            우) 62423 광주광역시 광산구 상무대로 312
            <br />
            담당자) 062-949-6843 (8:30~16:30)
            <br />
            교무실) 062-949-6800 (08:30~16:30)
          </div>
          <div className="mt-8 text-[12px] text-[#666666]">
            © 2025 Ready,GSM. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
