export const NAV_LINKS = {
  client: [
    { href: '/', label: '홈' },
    { href: '/programs', label: '학과 체험 신청' },
    { href: '/applications', label: '신청 조회' },
    { href: '/faq', label: '자주 묻는 질문' },
    { href: '/introduce', label: '더모먼트' },
  ],
  admin: [
    { href: '/admin/form', label: '학과 체험' },
    { href: '/admin/applicants', label: '신청자' },
  ],
} as const;
