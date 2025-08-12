import { api } from '@/app/libs/api';
import type { ModuleForm } from '../../schemas/module-form-schema';

export const updateModule = async (data: ModuleForm, moduleId: string) => {
  const response = await api.put(`/modules/${moduleId}`, data);
  return response.data;
};
