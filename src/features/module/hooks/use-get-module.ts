import { useQuery } from '@tanstack/react-query';
import { getModule, type GetModuleResponse } from '../services/get-module';

export const useGetModule = (id: string) => {
  return useQuery<GetModuleResponse>({
    queryKey: ['module', id],
    queryFn: () => getModule(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};
