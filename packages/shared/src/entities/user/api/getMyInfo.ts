import { cookies } from 'next/headers';

import { type ApiResponseType, userUrl } from '@shared/api';

import type { UserType } from '../model/types';

const getMyInfo = async (): Promise<UserType | undefined> => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${userUrl.getMyInfo()}`, {
      headers: { Cookie: cookieStore.toString() },
      cache: 'no-store',
    });
    if (!res.ok) return undefined;
    const json = (await res.json()) as ApiResponseType<UserType>;
    return json.data;
  } catch {
    return undefined;
  }
};

export default getMyInfo;
