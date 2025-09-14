import type { User } from '@/@types/user';
import { api } from '@/app/libs/api';

export const getUserInformation = async (): Promise<User> => {
  const response = await api.get('auth/me');
  return response.data;
};
