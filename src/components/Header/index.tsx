import Link from 'next/link';

import { ReadyGSMLogo } from '@/assets';
import { cn } from '@/lib/utils';

import ActiveLink from '../ActiveLink';
import { Button } from '../ui';

const activeStyle = [
  'text-gray-900',
  'after:w-6',
  'after:bg-sky-300',
  'after:content-[""]',
  'after:absolute',
  'after:bottom-[-4px]',
  'after:w-5',
  'after:h-1',
  'after:left-1/2',
  'after:translate-x-[-50%]',
  'after:rounded-lg',
];

const activeTextStyle = ['relative', 'text-[0.875rem]/[1.5rem]', 'md:text-[1.125rem]/[1.75rem]'];

const Header = () => {
  const links = [
    { href: '/', label: '홈' },
    { href: '/programs', label: '프로그램' },
    { href: '/faq', label: '자주 묻는 질문' },
    { href: '/profile', label: '내 정보' },
  ];

  return (
    <header
      className={cn(
        'h-[4.5rem]',
        'px-[16rem]',
        'sticky',
        'top-0',
        'bg-white',
        'z-20',
        'flex',
        'items-center',
        'justify-between',
      )}
    >
      <div className={cn('flex', 'gap-[7.75rem]', 'items-center')}>
        <Link href="/">
          <ReadyGSMLogo />
        </Link>
        <nav
          className={cn(
            'gap-[2.75rem]',
            'hidden',
            'md:flex',
            'justify-between',
            'text-lg',
            'font-[600]',
            'text-gray-500',
          )}
        >
          {links.map(({ label, href }) => (
            <ActiveLink
              key={label}
              href={href}
              className={cn([...activeTextStyle])}
              activeClassName={cn(...activeStyle)}
            >
              {label}
            </ActiveLink>
          ))}
        </nav>
      </div>
      <Button variant="fill">로그인</Button>
    </header>
  );
};

export default Header;
