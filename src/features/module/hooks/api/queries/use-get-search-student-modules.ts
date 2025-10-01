import {
  getSearchStudentModules,
  type GetSearchStudentModules,
  type ModuleSearchFilters,
} from '@/features/module/services/queries/get-search-student-modules';
import { useQuery } from '@tanstack/react-query';

export const useGetSearchStudentModules = (filters: ModuleSearchFilters) => {
  const { data, ...rest } = useQuery<GetSearchStudentModules>({
    queryKey: ['student-modules', filters],
    queryFn: () => getSearchStudentModules(filters),
  });

  return { modules: data?.data, ...rest };
};
