import { api } from '@/app/libs/api';

export interface DeleteModuleResponse {
  message: string;
  data: string;
}

export const deleteModule = async (
  id: string,
): Promise<DeleteModuleResponse> => {
  const response = await api.delete(`/modules/${id}`);
  return response.data;
};
