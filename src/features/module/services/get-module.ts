import { type Module } from '@/@types/module';
import { api } from '@/app/libs/api';

export interface GetModuleResponse {
  message: string;
  data: Module;
}

export const getModule = async (id: string): Promise<GetModuleResponse> => {
  const response = await api.get(`/modules/${id}`);
  return response.data;
};
