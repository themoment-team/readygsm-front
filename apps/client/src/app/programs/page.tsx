import type { Metadata } from 'next';

import { getActivityArchiveList, getActivityList } from '@shared/entities/activity';

export const dynamic = 'force-dynamic';
import getMyApplication from '@shared/entities/application/api/getMyApplication';
import getMyInfo from '@shared/entities/user/api/getMyInfo';

import { ProgramsPage } from '@/views/programs';

export const metadata: Metadata = {
  title: '프로그램 신청',
  description: '원하는 학과 체험 프로그램을 선택하고 신청 정보를 입력해 참가 신청을 완료해보세요.',
};

const Programs = async () => {
  const [result, user, archivedActivities] = await Promise.all([
    getActivityList(),
    getMyInfo(),
    getActivityArchiveList().catch(() => []),
  ]);
  const isLoggedIn = !!user && user.role !== 'UNAUTHENTICATED';

  const application = isLoggedIn ? await getMyApplication(user.id) : undefined;

  return (
    <ProgramsPage
      activities={result?.data ?? []}
      archivedActivities={archivedActivities}
      application={!!application}
      userId={isLoggedIn ? user.id : undefined}
    />
  );
};

export default Programs;
