import { getActivityList } from '@shared/entities/activity/index.server';

import { ActivityFormView } from '@/features/manageActivity';

export const dynamic = 'force-dynamic';

const AdminFormPage = async () => {
  const response = await getActivityList();

  if (!response) throw new Error('학과 체험 목록을 불러오는데 실패했습니다.');

  const isFirstActivity = !response.data?.length;
  const firstActivity = response.data?.[0];
  const registrationPeriod = firstActivity
    ? {
        registrationStartAt: firstActivity.registrationStartAt,
        registrationEndAt: firstActivity.registrationEndAt,
      }
    : undefined;

  return (
    <ActivityFormView
      mode="create"
      isFirstActivity={isFirstActivity}
      registrationPeriod={registrationPeriod}
    />
  );
};

export default AdminFormPage;
