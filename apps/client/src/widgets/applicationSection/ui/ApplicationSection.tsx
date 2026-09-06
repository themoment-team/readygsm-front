'use client';

import { useState } from 'react';

import { toast } from 'react-toastify';

import { type ActivityType } from '@shared/entities/activity';
import { type ApplicationType } from '@shared/entities/application';
import { type UserType } from '@shared/entities/user';
import { cn } from '@shared/lib';
import { Button, EmptyState, SectionHeader } from '@shared/ui';

import { ProgramCard } from '@/entities/program';
import { CancelApplyModal } from '@/features/cancelApply';

interface ApplicationSectionProps {
  user: UserType | undefined;
  application: ApplicationType | undefined;
  activity: ActivityType | undefined;
}

const ApplicationSection = ({ user, application, activity }: ApplicationSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isPeriodEnded] = useState(() =>
    typeof window !== 'undefined' && activity
      ? new Date() > new Date(activity.registrationEndAt)
      : false,
  );

  const handleCancelClick = () => {
    if (isPeriodEnded) {
      toast.error('학과체험 신청 취소 기간이 아닙니다.');
      return;
    }
    setIsModalOpen(true);
  };

  if (!user || user.role === 'UNAUTHENTICATED') {
    return (
      <EmptyState
        title="로그인이 필요한 기능입니다"
        description="학과 체험 신청 조회는 로그인이 필요한 기능입니다. 로그인 후 이용해주세요"
      />
    );
  }

  if (!application) {
    return (
      <EmptyState
        title="학과 체험을 아직 신청하지 않았습니다"
        description="학과 체험을 아직 신청하지 않은 상태입니다. 학과 체험을 신청하거나 로그인된 계정을 확인해주세요."
      />
    );
  }

  return (
    <main
      className={cn(
        'flex flex-col items-center bg-white',
        'min-h-111.25 px-6 py-12',
        'lg:min-h-[calc(100vh-6.25rem-11.3125rem)] lg:px-4',
      )}
    >
      <div className={cn('flex w-full max-w-155.5 flex-col gap-9')}>
        {activity && (
          <section className={cn('flex flex-col gap-5 lg:gap-4')}>
            <SectionHeader
              title="신청한 학과 체험 정보"
              description="로그인된 계정으로 신청된 학과 체험을 확인할 수 있습니다."
            />
            <ProgramCard
              name={activity.name}
              description={activity.description}
              activityDate={activity.activityDate}
              maxApplicant={activity.maxApplicant}
              currentApplicant={activity.currentApplicant}
              isReserved={application.isReserve}
              reserveOrder={application.reserveOrder}
              disableHover
            />
          </section>
        )}

        <section className={cn('flex flex-col gap-5 lg:gap-4')}>
          <SectionHeader
            title="신청자 정보"
            description="학과 체험을 신청한 사람의 정보를 불러옵니다."
          />
          <div className={cn('border-border-variant w-full rounded-lg border bg-white px-6 py-5')}>
            <div className={cn('grid grid-cols-1 gap-4 lg:grid-cols-2')}>
              <dl className={cn('flex flex-col gap-4')}>
                <div className={cn('flex gap-4')}>
                  <dt className={cn('text-secondary-slate w-14 shrink-0 text-xs lg:text-sm')}>
                    이름
                  </dt>
                  <dd className={cn('text-neutral-dark text-sm font-medium')}>
                    {application.name}
                  </dd>
                </div>
                <div className={cn('flex gap-4')}>
                  <dt className={cn('text-secondary-slate w-14 shrink-0 text-xs lg:text-sm')}>
                    학번
                  </dt>
                  <dd className={cn('text-neutral-dark text-sm font-medium')}>
                    {application.grade}학년 {application.classNumber}반{' '}
                    {String(application.number).padStart(2, '0')}번
                  </dd>
                </div>
                <div className={cn('flex gap-4')}>
                  <dt className={cn('text-secondary-slate w-14 shrink-0 text-xs lg:text-sm')}>
                    학교명
                  </dt>
                  <dd className={cn('text-neutral-dark text-sm font-medium')}>
                    {application.schoolName}
                  </dd>
                </div>
              </dl>
              <dl className={cn('flex flex-col gap-4')}>
                <div className={cn('flex gap-4')}>
                  <dt
                    className={cn(
                      'text-secondary-slate w-24 shrink-0 text-xs whitespace-nowrap lg:text-sm',
                    )}
                  >
                    전화번호
                  </dt>
                  <dd className={cn('text-neutral-dark text-sm font-medium')}>
                    {application.phoneNumber}
                  </dd>
                </div>
                <div className={cn('flex gap-4')}>
                  <dt
                    className={cn(
                      'text-secondary-slate w-24 shrink-0 text-xs whitespace-nowrap lg:text-sm',
                    )}
                  >
                    보호자 전화번호
                  </dt>
                  <dd className={cn('text-neutral-dark text-sm font-medium')}>
                    {application.familyPhoneNumber}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <Button
          variant="outlineDanger"
          size="full"
          onClick={handleCancelClick}
          className={cn(isPeriodEnded && 'cursor-not-allowed opacity-50 hover:bg-transparent')}
        >
          학과 체험 취소
        </Button>
      </div>

      <CancelApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={application.userId}
        activityId={application.activityId}
      />
    </main>
  );
};

export default ApplicationSection;
