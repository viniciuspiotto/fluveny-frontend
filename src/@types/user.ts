export type UserRole = 'STUDENT' | 'CONTENT_CREATOR' | 'ADMIN';

export type User = {
  id: string;
  name: string;
  role: UserRole;
  email: string;
};
