import {
  getModule,
  type GetModuleResponse,
} from '@/features/module/services/get-module';
import { useQuery } from '@tanstack/react-query';

export const useGetModule = (id: string) => {
  return useQuery<GetModuleResponse>({
    queryKey: ['module', id],
    queryFn: () => getModule(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};
