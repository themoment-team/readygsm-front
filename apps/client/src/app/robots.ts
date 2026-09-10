import type { MetadataRoute } from 'next';

import { SITE_URL } from './config/siteConfig';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/applications', '/oauth/callback'],
  },
  sitemap: `${SITE_URL}/sitemap.xml`,
});

export default robots;
