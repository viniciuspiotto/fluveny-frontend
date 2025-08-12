import { type Module } from '@/@types/module';
import { api } from '@/app/libs/api';

export interface GetModuleResponse {
  message: string;
  data: Module;
}

export const getModule = async (
  moduleId: string,
): Promise<GetModuleResponse> => {
  const response = await api.get(`/modules/${moduleId}`);
  return response.data;
};
