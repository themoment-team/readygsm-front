import { z } from 'zod';

export const memberSchema = z.object({
  name: z.string().min(1, '이름은 필수입니다.'),
  phone: z.string().min(11, '전화번호는 11자리 이상이어야 합니다.'),
  grade: z.object({
    grade: z.string().min(1, '학년을 입력해주세요'),
    class: z.string().min(1, '반을 입력해주세요'),
    number: z.string().min(1, '번호를 입력해주세요'),
  }),
  school: z.string().min(1, '학교를 입력해주세요'),
});

export const formSchema = z.object({
  members: z.array(memberSchema),
});
