import { z } from 'zod';

import type { UserRoleType } from '@shared/entities/user';

export const UserRoleFormSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  role: z.enum(['USER', 'ADMIN', 'ROOT'] as [UserRoleType, ...UserRoleType[]]),
});

export type UserRoleFormType = z.infer<typeof UserRoleFormSchema>;
