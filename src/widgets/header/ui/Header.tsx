'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { Button, buttonVariants } from '@/shared/ui';

import { NAV_LINKS } from '../model/navigation';

type Role = 'guest' | 'client' | 'admin';

const Header = () => {
  const pathname = usePathname();
  const [role, setRole] = useState<Role>('admin'); // 임시로 admin으로 설정함
  const isAdmin = pathname.startsWith('/admin');
  const links = isAdmin ? NAV_LINKS.admin : NAV_LINKS.client;

  return (
    <header className={cn('w-full bg-white')}>
      <div
        className={cn(
          'mx-auto flex h-25 max-w-480 items-center justify-between',
          role === 'admin' && !isAdmin ? 'pr-[6.69rem] pl-80' : 'px-80',
        )}
      >
        <Link href="/" className={cn('flex items-center gap-3')}>
          <Logo />
          <span className={cn('text-neutral-dark text-[1.5rem] font-bold')}>Ready, GSM</span>
        </Link>

        <nav className={cn('flex items-center gap-12')}>
          {links.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative flex flex-col items-center text-2xl leading-[120%] font-semibold transition-colors',
                  isActive ? 'text-neutral-dark' : 'text-soft-gray hover:text-dark-utility',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'bg-brand-primary absolute -bottom-2 h-1 rounded-lg transition-[width] duration-300 ease-in-out',
                    isActive ? 'w-5' : 'w-0',
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className={cn('flex items-center gap-4')}>
          <Button
            onClick={() => setRole((prev) => (prev === 'guest' ? 'client' : 'guest'))} // 임시
            variant={role === 'guest' ? 'default' : 'outlinePrimary'}
            size="md"
          >
            {role === 'guest' ? '로그인' : '로그아웃'}
          </Button>
          {role === 'admin' && !isAdmin && (
            <Link href="/admin" className={cn(buttonVariants({ variant: 'default', size: 'md' }))}>
              어드민 페이지로 이동
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
