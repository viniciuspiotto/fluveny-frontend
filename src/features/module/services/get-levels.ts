import type { Level } from '@/@types/module';
import { api } from '@/app/libs/api';

export interface GetLevelsResponse {
  message: string;
  data: Level[];
}

export const getLevels = async (): Promise<GetLevelsResponse> => {
  const response = await api.get('/levels');
  return response.data;
};
