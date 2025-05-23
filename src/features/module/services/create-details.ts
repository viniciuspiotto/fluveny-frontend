import { api } from '@/app/libs/api';
import type { DetailsData } from '../schemas/details-schema';

export const createModule = async (data: DetailsData) => {
  const response = await api.post('/modules', data);
  return response.data;
};
