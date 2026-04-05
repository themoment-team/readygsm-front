'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo } from '@/shared/assets';
import { cn } from '@/shared/lib';

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
                className={cn(
                  'relative flex flex-col items-center text-[1.5rem] leading-[120%] font-semibold transition-colors',
                  isActive ? 'text-[#292B2F]' : 'text-[#9EA7B9] hover:text-[#747B88]',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-2 h-1 rounded-lg bg-[#2563EB] transition-[width] duration-300 ease-in-out',
                    isActive ? 'w-5' : 'w-0',
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setIsLoggedIn((prev) => !prev)}
          className={cn(
            'inline-flex items-center justify-center rounded-lg px-6 py-3 text-[1.125rem] leading-none font-medium',
            isLoggedIn
              ? 'border border-[#2563EB] text-[#2563EB]'
              : 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]',
          )}
        >
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>
      </div>
    </header>
  );
};

export default Header;
