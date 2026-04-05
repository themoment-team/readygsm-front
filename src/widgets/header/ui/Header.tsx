'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo } from '@/shared/assets';

import { NAV_LINKS } from '../model/navigation';

const Header = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex h-25 max-w-480 items-center justify-between px-80">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-[1.5rem] font-bold text-[#222222]">Ready, GSM</span>
        </Link>

        <nav className="flex items-center gap-12">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex flex-col items-center text-[1.5rem] leading-[120%] font-semibold transition-colors ${isActive ? 'text-[#292B2F]' : 'text-[#9EA7B9] hover:text-[#747B88]'} `}
              >
                {link.label}
                <span
                  style={{
                    width: isActive ? '1.25rem' : '0',
                    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  className="absolute -bottom-2 h-1 rounded-lg bg-[#2563EB]"
                />
              </Link>
            );
          })}
        </nav>

        {isLoggedIn ? (
          <button
            onClick={() => setIsLoggedIn(false)}
            className="inline-flex items-center justify-center rounded-lg border border-[#2563EB] px-6 py-3 text-[1.125rem] leading-none font-medium text-[#2563EB]"
          >
            로그아웃
          </button>
        ) : (
          <button
            onClick={() => setIsLoggedIn(true)}
            className="inline-flex items-center justify-center rounded-lg bg-[#2563EB] px-6 py-3 text-[1.125rem] leading-none font-medium text-white hover:bg-[#1D4ED8]"
          >
            로그인
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
