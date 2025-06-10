import { api } from '@/app/libs/api';
import type { ModuleData } from '../schemas/module-schema';

export const createModule = async (data: ModuleData) => {
  const response = await api.post('/modules', data);
  return response.data;
};
