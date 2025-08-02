'use client';

import React, { useEffect, useState } from 'react';

import { Person } from '@/assets';
import { get } from '@/lib/api';
import { cn } from '@/lib/utils';

interface HelloProps {
  email: string;
}

interface Users {
  email: string;
  reservations: {
    activityMajor: string;
    activityPlace: string;
    activityType: string;
  }[];
}

// interface BoxProps {
//   reservations: {
//     activityMajor: string;
//     activityPlace: string;
//     activityType: string;
//   }[];
// }

const Hello = ({ email }: HelloProps) => {
  return (
    <div className={cn('flex', 'flex-col', 'justify-center', 'items-center', 'gap-[1.25rem]')}>
      <div
        className={cn(
          'rounded-[1.5rem]',
          'bg-gray-100',
          'flex',
          'w-[5.5rem]',
          'h-[5.5rem]',
          'px-[1.5rem]',
          'py-[1.375rem]',
          'items-center',
        )}
      >
        <Person />
      </div>
      <h3
        className={cn(
          'text-gray-800',
          'text-center',
          'text-[1.5rem]',
          'leading-[2rem]',
          'tracking-[-0.009rem]',
          'font-semibold',
        )}
      >
        {email}
      </h3>
    </div>
  );
};

// const Box = ({ reservations }: BoxProps) => {
//   return <div>asdf</div>;
// };

const ProfilePage = () => {
  const [users, setUsers] = useState<Users | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get<Users>('/api/v1/users/me');
        setUsers(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={cn('bg-background', 'h-screen', 'font-[Pretendard]')}>
      <div
        className={cn('mt-[9rem]', 'flex', 'flex-col', 'items-center', 'justify-center', 'gap-8')}
      >
        <Hello email={users?.email ?? 's24015@gsm.hs.kr'} />
        <div className={cn('flex', 'flex-col', 'gap-8')}>
          <div
            className={cn(
              'w-[60rem]',
              'text-gray-700',
              'font-[Pretendard]',
              'text-[1.5rem]',
              'leading-[1.5rem]',
              'font-medium',
              'p-[1.25rem]',
              'mobile:p-[2rem]',
              'mobile-lg:p-[1.25rem]',
              'mobile:sm-[1.5rem]',
            )}
          >
            신청된 프로그램
          </div>
          {/* <Box reservations={users?.reservations ?? []} /> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
