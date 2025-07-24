import Logo from '@/asset/logo';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 px-6 py-10 text-[13px] text-gray-400 tablet-sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 tablet-sm:flex-row">
        <div className="hidden items-center tablet-sm:flex tablet-sm:flex-col tablet-sm:items-start">
          <Logo />
        </div>

        <div className="flex flex-col items-center text-[13px] text-gray-600 tablet-sm:items-end">
          <div className="text-[1.125rem] font-normal text-gray-500">
            © {year} Ready,GSM. All rights reserved.
          </div>

          <div className="mt-[1rem] flex gap-6 text-[1.25rem] font-bold text-gray-600">
            <a href="http://gsm.gen.hs.kr/main/main.php">홈페이지</a>
            <a href="https://official.hellogsm.kr/about/location">찾아오시는 길</a>
            <a href="http://gsm.gen.hs.kr/sub/page.php?page_code=info_14">교내 배치도</a>
          </div>

          <div className="mt-[4rem] text-center text-[1rem] leading-relaxed text-gray-400 tablet-sm:text-right">
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
