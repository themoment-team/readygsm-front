'use client';

import { usePathname } from 'next/navigation';

import { Footer } from '@/components';

const ClientOnlyFooter = () => {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return !isAdminPage ? <Footer /> : null;
};

export default ClientOnlyFooter;
