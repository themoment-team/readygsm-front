'use client';

import { ActivityType } from '@shared/entities/activity';
import { cn } from '@shared/lib';

import { ProgramCard } from '@/entities/program';

interface HomeProgramSectionProps {
  activities: ActivityType[];
  selectedActivityId?: number;
  onSelect: (activity: ActivityType) => void;
}

const HomeProgramSection = ({
  activities,
  selectedActivityId,
  onSelect,
}: HomeProgramSectionProps) => {
  return (
    <main className={cn('flex w-full flex-col items-center justify-center gap-4 bg-white')}>
      {activities.map((activity) => (
        <ProgramCard
          key={activity.id}
          name={activity.name}
          description={activity.description}
          activityDate={activity.activityDate}
          maxApplicant={activity.maxApplicant}
          currentApplicant={activity.currentApplicant}
          isSelected={
            selectedActivityId === undefined ? undefined : selectedActivityId === activity.id
          }
          onClick={() => onSelect(activity)}
        />
      ))}
    </main>
  );
};

export default HomeProgramSection;
