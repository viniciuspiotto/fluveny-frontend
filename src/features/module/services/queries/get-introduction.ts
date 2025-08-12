import type { Introduction } from '@/@types/module';
import { api } from '@/app/libs/api';

export interface GetIntroductionResponse {
  message: string;
  data: Introduction;
}

export const getIntroduction = async (
  id: string,
): Promise<GetIntroductionResponse> => {
  const response = await api.get(`modules/${id}/introduction`);
  return response.data;
};
