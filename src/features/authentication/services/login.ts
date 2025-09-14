import { api } from '@/app/libs/api';
import type { LoginForm } from '../schemas/login-schema';

export const login = async (data: LoginForm) => {
  const response = await api.post('auth/login', data);
  return response.data;
};
