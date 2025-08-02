import Logo from '@/asset/logo';
import { cn } from '@/lib/utils';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'bg-gray-50',
        'text-[0.8125rem]',
        'text-gray-400',
        'py-[3.75rem]',
        'px-[1rem]',
        'mobile-lg:px-[1.5rem]',
        'tablet-sm:px-[2rem]',
        'tablet:px-[5rem]',
        'tablet-lg:px-[5rem]',
        'desktop-sm:px-[5rem]',
        'desktop:px-[5rem]',
        'desktop-lg:px-[14rem]',
        'desktop-xl:px-[21.25rem]',
      )}
    >
      <div className={cn('flex', 'w-full', 'flex-col', 'justify-between', 'mobile-lg:flex-row')}>
        <div className={cn('hidden', 'tablet:flex', 'items-center', 'items-end')}>
          <Logo />
        </div>

        <div
          className={cn(
            'flex',
            'flex-col',
            'items-end',
            'text-[0.8125rem]',
            'text-gray-600',
            'text-right',
            'w-full',
          )}
        >
          <div className={cn('text-[1.125rem]', 'font-[500]', 'text-gray-500')}>
            © {year} Ready,GSM. All rights reserved.
          </div>

          <div
            className={cn(
              'mt-[1rem]',
              'flex',
              'gap-6',
              'text-[1.25rem]',
              'font-[700]',
              'tablet-sm:justify-end',
            )}
          >
            <a href="http://gsm.gen.hs.kr/main/main.php">홈페이지</a>
            <a href="https://official.hellogsm.kr/about/location">찾아오시는 길</a>
            <a href="http://gsm.gen.hs.kr/sub/page.php?page_code=info_14">교내 배치도</a>
          </div>

          <div
            className={cn(
              'mt-[4rem]',
              'text-right',
              'text-[1rem]',
              'leading-[1.2rem]',
              'text-gray-400',
              'font-[500]',
            )}
          >
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
