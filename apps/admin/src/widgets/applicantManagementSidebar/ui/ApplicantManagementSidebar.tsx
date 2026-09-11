'use client';

import { Puzzle } from 'lucide-react';

import { useGetActivityList } from '@shared/entities/activity';
import { cn } from '@shared/lib';

interface ApplicantManagementSidebarProps {
  selectedActivityId: number | null;
  onSelectActivity: (id: number) => void;
}

const ApplicantManagementSidebar = ({
  selectedActivityId,
  onSelectActivity,
}: ApplicantManagementSidebarProps) => {
  const { data: activityList } = useGetActivityList();
  const activities = activityList?.data ?? [];

  return (
    <div className={cn('flex h-full w-full flex-col items-start gap-10')}>
      {/* 인사말 */}
      <div className={cn('px-4')}>
        <p className={cn('text-base font-semibold text-[#374151]')}>
          {'HELLO '}
          <span className={cn('text-[#2563eb]')}>ADMIN!</span>
        </p>
      </div>

      {/* 메뉴 영역 */}
      <div className={cn('flex w-full flex-col gap-2')}>
        {/* 메인 메뉴 */}
        <div className={cn('flex w-full items-center gap-2 rounded-lg px-3 py-2.5')}>
          <Puzzle className={cn('size-5 shrink-0 text-[#111827]')} />
          <span className={cn('text-sm font-semibold text-[#111827]')}>신청자 관리</span>
        </div>

        {/* 서브 메뉴 — API에서 받아온 학과 체험 목록 */}
        <div className={cn('flex w-full flex-col gap-1')}>
          {activities.map((activity) => (
            <button
              key={activity.id}
              type="button"
              onClick={() => onSelectActivity(activity.id)}
              className={cn(
                'flex w-full items-center overflow-hidden rounded-lg bg-white py-2.5 pr-3 pl-10 text-left text-sm leading-[1.4]',
                selectedActivityId === activity.id ? 'text-neutral-dark' : 'text-gray-400',
              )}
            >
              {activity.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicantManagementSidebar;
