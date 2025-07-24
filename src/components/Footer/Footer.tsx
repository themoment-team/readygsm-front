'use client';

import Logo from '@/asset/logo';

const Footer = () => {
  return (
    <footer className="bg-[#F9FAFB] px-6 py-10 text-[13px] text-[#9CA3AF] sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row">
        <div className="hidden items-center sm:flex sm:flex-col sm:items-start">
          <Logo />
        </div>

        <div className="flex flex-col items-center text-[13px] text-[#4B5563] sm:items-end">
          <div className="text-[1.125rem] font-normal text-[#6B7280]">
            © 2025 Ready,GSM. All rights reserved.
          </div>

          <div className="mt-4 flex gap-6 text-[1.25rem] font-bold text-[#4B5563]">
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

          <div className="mt-16 text-center text-[1rem] leading-relaxed text-[#9CA3AF] sm:text-right">
            우) 62423 광주광역시 광산구 상무대로 312
            <br />
            담당자) 062-949-6843 (8:30~16:30)
            <br />
            교무실) 062-949-6800 (08:30~16:30)
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
