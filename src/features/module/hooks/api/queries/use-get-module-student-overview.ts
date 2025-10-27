import {
  getModuleStudentOverview,
  type getModuleStudentOverviewResponse,
} from '@/features/module/services/queries/get-module-stuident-overview';
import { useQuery } from '@tanstack/react-query';

export const useGetModuleStudentOverview = (id: string | undefined) => {
  const { data, ...rest } = useQuery<getModuleStudentOverviewResponse>({
    queryKey: ['module', id],
    queryFn: () => getModuleStudentOverview(id!),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });

  return { data: data?.data, ...rest };
};
