import { Suspense } from 'react';

import { OauthCallbackPage } from '@/views/oauthCallback';

const OauthCallbackRoute = () => (
  <Suspense>
    <OauthCallbackPage />
  </Suspense>
);

export default OauthCallbackRoute;
