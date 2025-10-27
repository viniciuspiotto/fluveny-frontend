export type UserRole = 'STUDENT' | 'CONTENT_CREATOR' | 'ADMIN';

export type User = {
  name: string;
  role: UserRole;
  email: string;
};
