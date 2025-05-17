import { api } from '@/app/libs/api';
import type { CreateInformationModuleData } from '../schemas/module-information-schema';

export const createModule = async (data: CreateInformationModuleData) => {
  const response = await api.post('/modules', data);
  return response.data;
};
