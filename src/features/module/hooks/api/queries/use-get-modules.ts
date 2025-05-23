import {
  getModules,
  type GetModulesResponse,
} from '@/features/module/services/get-modules';
import { useQuery } from '@tanstack/react-query';

export const useGetModules = () => {
  return useQuery<GetModulesResponse>({
    queryKey: ['modules'],
    queryFn: getModules,
    staleTime: 5 * 60 * 1000,
  });
};
