'use client';

import { useState } from 'react';

import { toast } from 'react-toastify';

import { ActivityType } from '@shared/entities/activity';
import { cn } from '@shared/lib';
import { CompletionMessage } from '@shared/ui';

import { ProgramCard } from '@/entities/program';
import { LoginModal } from '@/features/auth';
import { trackEvent } from '@/shared/lib';
import { ApplicationForm } from '@/widgets/applyDepartment';
import { HomeProgramSection } from '@/widgets/homeProgramSection';

interface ProgramsPageProps {
  activities: ActivityType[];
  archivedActivities: ActivityType[];
  application: boolean;
  userId?: number;
}

const ProgramsPage = ({
  activities,
  archivedActivities,
  application,
  userId,
}: ProgramsPageProps) => {
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);
  const [isApplicationCompleted, setIsApplicationCompleted] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSelectActivity = (activity: ActivityType) => {
    if (!userId) {
      toast.error('로그인이 필요한 기능입니다.');
      setIsLoginModalOpen(true);
      return;
    }

    trackEvent('apply_form_open', { activity_id: activity.id, activity_name: activity.name });
    setSelectedActivity(activity);
  };

  if (activities.length === 0) {
    if (archivedActivities.length > 0) {
      return (
        <div
          className={cn(
            'mx-auto flex w-full max-w-155.5 flex-col gap-12 px-6 py-6',
            'lg:gap-9 lg:px-0 lg:py-9',
          )}
        >
          <div className={cn('flex flex-col gap-2')}>
            <p className={cn('text-neutral-dark text-[1.5rem] leading-[1.2] font-semibold')}>
              학과 체험 신청 기간이 아닙니다
            </p>
            <p className={cn('text-secondary-slate text-[0.875rem] leading-[1.2]')}>
              지난 학과 체험 프로그램을 소개해드립니다.
            </p>
          </div>
          <div className={cn('flex flex-col items-center gap-4')}>
            {archivedActivities.map((activity) => (
              <ProgramCard
                key={activity.id}
                name={activity.name}
                description={activity.description}
                activityDate={activity.activityDate}
                maxApplicant={activity.maxApplicant}
                currentApplicant={activity.currentApplicant}
                disableHover
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <CompletionMessage
        title="학과 체험 신청 기간이 아닙니다"
        description="학과 체험 신청 기간은 9월 16일부터 22일까지 입니다."
      />
    );
  }

  if (application || isApplicationCompleted) {
    return (
      <CompletionMessage
        title="학과 체험 신청이 완료되었습니다"
        description="신청한 학과 체험은 신청 조회에서 확인해주세요."
      />
    );
  }

  return (
    <>
      <div
        className={cn(
          'mx-auto flex w-full max-w-155.5 flex-col gap-12 px-6 py-6',
          'lg:px-0 lg:py-9',
          'xl:min-h-[calc(100vh-6.25rem)] xl:w-7xl xl:max-w-none xl:flex-row xl:justify-center xl:gap-9',
        )}
      >
        <div className={cn('flex w-full flex-col gap-5 xl:w-155.5')}>
          <div className={cn('flex flex-col gap-2', selectedActivity && 'opacity-[0.5]')}>
            <p className={cn('text-neutral-dark text-[1.5rem] leading-[1.2] font-semibold')}>
              학과 체험 선택
            </p>
            <p className={cn('text-secondary-slate text-[0.875rem] leading-[1.2]')}>
              신청 이후 선택한 체험을 변경할 수 없으니 신중히 선택해주세요.
            </p>
          </div>
          <HomeProgramSection
            activities={activities}
            selectedActivityId={selectedActivity?.id}
            onSelect={handleSelectActivity}
          />
        </div>
        {selectedActivity && userId && (
          <div className={cn('flex w-full flex-col gap-5 xl:w-155.5')}>
            <div className={cn('flex flex-col gap-2')}>
              <p className={cn('text-neutral-dark text-[1.5rem] leading-[1.2] font-semibold')}>
                체험 신청자 정보 작성
              </p>
              <p className={cn('text-secondary-slate text-[0.875rem] leading-[1.2]')}>
                신청 이후 정보 수정이 불가하니 정보를 정확히 입력해 주세요.
              </p>
            </div>
            <ApplicationForm
              activityId={selectedActivity.id}
              activityName={selectedActivity.name}
              userId={userId}
              onSuccess={() => setIsApplicationCompleted(true)}
            />
          </div>
        )}
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};

export default ProgramsPage;
