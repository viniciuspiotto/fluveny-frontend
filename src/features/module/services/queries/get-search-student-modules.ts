import { type Module } from '@/@types/module';
import { api } from '@/app/libs/api';

export interface GetSearchStudentModules {
  message: string;
  data: Module[];
}

export type ModuleSearchFilters = {
  moduleName?: string;
  grammarRulesId?: string[];
  levelId?: string[];
  status?: string[];
};

export const getSearchStudentModules = async (
  filters: ModuleSearchFilters,
): Promise<GetSearchStudentModules> => {
  const formattedStatuses = filters.status?.map((s) => s.toUpperCase());

  const { data } = await api.get('modules/search/student', {
    params: {
      moduleName: filters.moduleName || undefined,
      grammarRulesId: filters.grammarRulesId,
      levelId: filters.levelId,
      status: formattedStatuses,
    },
    paramsSerializer: {
      indexes: null,
    },
  });
  return data;
};
