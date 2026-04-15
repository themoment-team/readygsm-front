import { cn } from '@/shared/lib';

import FooterGSMLogo from './FooterGSMLogo';

const LINKS = [
  {
    text: '개인정보처리방침',
    link: 'https://official.hellogsm.kr/policy/privacy',
  },
  {
    text: '영상정보처리기기운영·관리방침',
    link: 'https://official.hellogsm.kr/policy/cctv',
  },
  {
    text: '저작권신고 및 보호규정',
    link: 'https://official.hellogsm.kr/policy/copyright',
  },
  {
    text: '찾아오시는 길',
    link: 'https://official.hellogsm.kr/about/location',
  },
] as const;

const Footer = () => {
  const CURRENT_YEAR = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'relative',
        'flex',
        'w-full',
        'items-center',
        'justify-center',
        'bg-gray-50',
        'p-15',
        'lg:px-25',
        'xl:px-61',
        'fhd:px-80',
      )}
    >
      <div
        className={cn(
          'flex',
          'w-full',
          'flex-col',
          'items-start',
          'gap-10',
          'md:flex-row',
          'md:items-center',
          'md:justify-between',
          'md:gap-2',
        )}
      >
        <FooterGSMLogo />

        <div className={cn('flex', 'flex-col', 'items-start', 'gap-4', 'md:items-end')}>
          <div className={cn('flex', 'flex-col', 'items-start', 'gap-2', 'md:items-end')}>
            <p
              className={cn(
                'text-[1.125rem]/[1.6875rem]',
                'font-normal',
                'text-slate-600',
                'md:text-right',
              )}
            >
              ©{CURRENT_YEAR} Copyright 광주소프트웨어마이스터고등학교{' '}
              <br className={cn('sm:hidden')} />
              ALL RIGHTS RESERVED.
            </p>

            <div className={cn('flex', 'flex-col', 'gap-2', 'md:flex-row', 'md:gap-6')}>
              {LINKS.map(({ text, link }) => (
                <a
                  key={text}
                  href={link}
                  className={cn('text-[1.125rem]/[1.6875rem]', 'font-bold', 'text-slate-600')}
                  target="_blank"
                  rel="noreferrer"
                >
                  {text}
                </a>
              ))}
            </div>
          </div>

          <p
            className={cn(
              'text-[0.875rem]/[1.25rem]',
              'font-normal',
              'text-[#6b7686]',
              'md:text-right',
            )}
          >
            우) 62423 광주광역시 광산구 상무대로 312
            <br />
            교무실 062)949-6800(08:30~16:30) 행정실 062)949-6806(08:30~16:30)
            <br />
            팩스 062)941-7545 당직실 062)949-6899(평일야간, 휴일)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
