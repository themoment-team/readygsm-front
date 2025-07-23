'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';

import { Person } from '@/assets';
import { get } from '@/lib/api';
import { cn } from '@/lib/utils';

const Hello: React.FC<{ email: string }> = ({ email }) => {
  return (
    <div className={cn('flex', 'flex-col', 'justify-center', 'items-center', 'gap-[1.25rem]')}>
      <div
        className={cn(
          'rounded-[1.5rem]',
          'bg-[var(--gray,#E2E8F0)]',
          'flex',
          'w-[5.5rem]',
          'h-[5.5rem]',
          'px-[1.5rem]',
          'py-[1.375rem]',
          'items-center',
        )}
      >
        <Person></Person>
      </div>
      <div
        className={cn(
          'text-[var(--slate-800,#1E293B)]',
          'text-center',
          'font-[Pretendard]',
          'text-[1.5rem]',
          'leading-[2rem]',
          'tracking-[-0.009rem]',
        )}
      >
        {email}
      </div>
    </div>
  );
};

const Box = ({}) => {
  return <div></div>;
};

const ProfilePage = () => {
  interface Users {
    email: string;
  }

  const [users, setUsers] = useState<Users | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/v1/users/me');
        setUsers(res.data);
      } catch (err) {
        console.error('에러 발생:', err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={cn('bg-background', 'h-screen', 'font-[Pretendard]')}>
      <div
        className={cn('mt-[9rem]', 'flex', 'flex-col', 'items-center', 'justify-center', 'gap-8')}
      >
        <Hello email={users?.email ?? '알수없는오류'} />
        <div className={cn('flex', 'flex-col', 'gap-4')}>
          <div
            className={cn(
              'w-[60rem]',
              'text-[var(--gray-700,#374151)]',
              'font-[Pretendard]',
              'text-[1.5rem]',
              'leading-[1.5rem]',
            )}
          >
            신청된 프로그램
          </div>
          <Box></Box>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
