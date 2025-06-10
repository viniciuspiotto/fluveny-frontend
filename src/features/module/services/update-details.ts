import { api } from '@/app/libs/api';
import type { DetailsData } from '../schemas/module-schema';

export const updateDetails = async (data: DetailsData, moduleId: string) => {
  const response = await api.put(`/modules/${moduleId}`, data);
  return response.data;
};
