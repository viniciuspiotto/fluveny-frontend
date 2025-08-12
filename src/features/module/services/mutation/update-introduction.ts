import { api } from '@/app/libs/api';
import type { IntroductionForm } from '../../schemas/introduction-schema';

export const updateIntroduction = async (
  data: IntroductionForm,
  moduleId: string,
) => {
  const response = await api.put(`/modules/${moduleId}/introduction`, data);
  return response.data;
};
