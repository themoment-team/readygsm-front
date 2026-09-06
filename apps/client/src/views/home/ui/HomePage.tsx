import { cn } from '@shared/lib';

import {
  HomeSection1,
  HomeSection2,
  HomeSection3,
  HomeSection4,
  HomeSection5,
} from '@/widgets/homeSection';

const HomePage = () => {
  return (
    <div className={cn('mx-auto flex w-full max-w-480 flex-col')}>
      <HomeSection1 />
      <div
        className={cn(
          'bg-pure-white relative z-10 flex flex-col rounded-t-[1.5rem]',
          '-mt-86 gap-20 px-4 pt-4 pb-25',
          'lg:-mt-91.75 lg:gap-60 lg:px-9 lg:pt-9.75 lg:pb-50',
          'xl:-mt-45 xl:px-20 xl:pt-20 xl:pb-22.5',
        )}
      >
        <div className={cn('flex flex-col gap-20 lg:gap-30')}>
          <HomeSection2 />
          <HomeSection3 />
          <HomeSection4 />
        </div>
        <HomeSection5 />
      </div>
    </div>
  );
};

export default HomePage;
