import { notFound } from 'next/navigation';

import { getActivityById } from '@shared/entities/activity/index.server';

import { ActivityFormView } from '@/features/manageActivity';

interface AdminFormEditPageProps {
  params: Promise<{ id: string }>;
}

const AdminFormEditPage = async ({ params }: AdminFormEditPageProps) => {
  const { id } = await params;
  const activity = await getActivityById(Number(id));

  if (!activity) notFound();

  return <ActivityFormView mode="edit" activity={activity} />;
};

export default AdminFormEditPage;
