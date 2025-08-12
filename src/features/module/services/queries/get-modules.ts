import { type Module } from '@/@types/module';
import { api } from '@/app/libs/api';

export interface GetModulesResponse {
  message: string;
  data: Module[];
}

export const getModules = async (): Promise<GetModulesResponse> => {
  const response = await api.get(`/modules`);
  return response.data;
};
