import { api } from '@/app/libs/api';
import type { ModuleData } from '../schemas/module-schema';

export const updateModule = async (data: ModuleData, moduleId: string) => {
  const response = await api.put(`/modules/${moduleId}`, data);
  return response.data;
};
