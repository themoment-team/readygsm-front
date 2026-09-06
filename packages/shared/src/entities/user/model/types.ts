export type UserRoleType = 'UNAUTHENTICATED' | 'USER' | 'ADMIN' | 'ROOT';

export const checkIsAdmin = (role?: UserRoleType) => role === 'ADMIN' || role === 'ROOT';

export interface UserType {
  id: number;
  email: string;
  name: string;
  role: UserRoleType;
}
