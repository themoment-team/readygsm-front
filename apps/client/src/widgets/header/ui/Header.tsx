'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';

import { HamburgerIcon, Logo } from '@shared/assets';
import { usePostSignOut } from '@shared/entities/auth';
import { useGetMyInfo, userQueryKeys } from '@shared/entities/user';
import { cn } from '@shared/lib';
import { Button } from '@shared/ui';

import { LoginModal } from '@/features/auth';

import { NAV_LINKS } from '../model/navigation';
import NavLink from './NavLink';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [menuOpenPathname, setMenuOpenPathname] = useState<string | null>(null);
  const isMenuOpen = menuOpenPathname === pathname;

  const queryClient = useQueryClient();
  const { data: user } = useGetMyInfo();
  const { mutate: signOut } = usePostSignOut();

  const links = NAV_LINKS.client;

  const handleSignOut = () => {
    signOut(undefined, {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: userQueryKeys.getMyInfo() });
        toast.success('로그아웃 되었습니다.');
        router.replace('/');
      },
    });
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleMenuClose = () => setMenuOpenPathname(null);

  const activeLink = links
    .filter((link) => pathname === link.href || pathname.startsWith(link.href + '/'))
    .reduce((a, b) => (b.href.length > a.href.length ? b : a), { href: '' });

  const getIsActive = (href: string) => activeLink.href === href;

  return (
    <header className={cn('sticky top-0 z-50 w-full bg-white')}>
      <div
        className={cn(
          'mx-auto flex max-w-480 items-center justify-between',
          'h-18.75 px-6',
          'lg:h-20 xl:h-16',
          'lg:px-12 xl:px-20 2xl:px-80',
        )}
      >
        <Link href="/" className={cn('flex items-center gap-3')}>
          <Logo />
          <span className={cn('text-neutral-dark text-2xl font-bold xl:text-base')}>
            Ready, GSM
          </span>
        </Link>

        <nav className={cn('hidden items-center gap-12 xl:flex')}>
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={getIsActive(link.href)}
              icon={link.icon}
              isExternal={link.isExternal}
              withHover
            />
          ))}
        </nav>

        <div className={cn('hidden items-center gap-4 xl:flex')}>
          {user ? (
            <Button onClick={handleSignOut} variant="outlinePrimary" size="md">
              로그아웃
            </Button>
          ) : (
            <Button onClick={() => setIsLoginModalOpen(true)} variant="default" size="md">
              로그인
            </Button>
          )}
        </div>

        <button
          onClick={() => setMenuOpenPathname(isMenuOpen ? null : pathname)}
          className={cn('flex items-center justify-center xl:hidden')}
          aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          {isMenuOpen ? <X size={32} /> : <HamburgerIcon />}
        </button>
      </div>

      {isMenuOpen && (
        <>
          <div
            className={cn(
              'fixed inset-x-0 top-18.75 bottom-0 z-40 bg-black/20 lg:top-20 xl:hidden',
            )}
            onClick={handleMenuClose}
          />
          <div
            className={cn(
              'fixed top-18.75 right-0 z-40 overflow-y-auto bg-white lg:top-20 xl:hidden',
              'max-h-[calc(100dvh-4.6875rem)] lg:max-h-[calc(100dvh-5rem)]',
              'inline-flex min-w-46.5 flex-col items-end pt-9 pr-6 pb-34.25',
            )}
          >
            <div className={cn('flex flex-col items-end gap-12')}>
              {links.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={getIsActive(link.href)}
                  icon={link.icon}
                  isExternal={link.isExternal}
                  onClick={handleMenuClose}
                />
              ))}
              {user ? (
                <Button
                  onClick={() => {
                    handleSignOut();
                    handleMenuClose();
                  }}
                  variant="outlinePrimary"
                  size="md"
                >
                  로그아웃
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    handleMenuClose();
                  }}
                  variant="default"
                  size="md"
                >
                  로그인
                </Button>
              )}
            </div>
          </div>
        </>
      )}

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
};

export default Header;
