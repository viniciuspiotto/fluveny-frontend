import { type ModuleStudent } from '@/@types/module';
import { api } from '@/app/libs/api';

export interface getModuleStudentOverviewResponse {
  message: string;
  data: ModuleStudent;
}

export const getModuleStudentOverview = async (
  moduleId: string,
): Promise<getModuleStudentOverviewResponse> => {
  const response = await api.get(`/modules/${moduleId}/overview`);
  return response.data;
};
