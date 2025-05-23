import { api } from '@/app/libs/api';
import type { IntroductionData } from '../schemas/introduction-schema';

export const createIntroduction = async (
  data: IntroductionData,
  moduleId: string,
) => {
  const response = await api.post(`/modules/${moduleId}/introduction`, data);
  return response.data;
};
