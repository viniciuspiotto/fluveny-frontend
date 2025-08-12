import { api } from '@/app/libs/api';
import type { IntroductionForm } from '../../schemas/introduction-schema';

export const createIntroduction = async (
  data: IntroductionForm,
  moduleId: string,
) => {
  const response = await api.post(`/modules/${moduleId}/introduction`, data);
  return response.data;
};
