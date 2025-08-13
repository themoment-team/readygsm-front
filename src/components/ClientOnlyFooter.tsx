'use client';

import { usePathname } from 'next/navigation';

import { Footer } from '@/components';

export default function ClientOnlyFooter() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return !isAdminPage ? <Footer /> : null;
}
