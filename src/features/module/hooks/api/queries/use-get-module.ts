import {
  getModule,
  type GetModuleResponse,
} from '@/features/module/services/queries/get-module';
import { useQuery } from '@tanstack/react-query';

export const useGetModule = (id: string | undefined) => {
  const { data, ...rest } = useQuery<GetModuleResponse>({
    queryKey: ['module', id],
    queryFn: () => getModule(id!),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });

  return { data: data?.data, ...rest };
};
