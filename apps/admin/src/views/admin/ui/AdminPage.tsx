import { getActivityList } from '@shared/entities/activity/index.server';

import { AdminSection } from '@/widgets/adminSection';

const AdminPage = async () => {
  const activities = (await getActivityList())?.data ?? [];

  return <AdminSection activities={activities} />;
};

export default AdminPage;
