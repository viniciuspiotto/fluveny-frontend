import { api } from '@/app/libs/api';
import type { IntroductionData } from '../schemas/introduction-schema';

export const updateIntroduction = async (
  data: IntroductionData,
  moduleId: string,
) => {
  const response = await api.put(`/modules/${moduleId}/introduction`, data);
  return response.data;
};
