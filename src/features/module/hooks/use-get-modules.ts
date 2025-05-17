import { useQuery } from '@tanstack/react-query';
import { getModules, type GetModulesResponse } from '../services/get-modules';

export const useGetModules = () => {
  return useQuery<GetModulesResponse>({
    queryKey: ['modules'],
    queryFn: getModules,
    staleTime: 5 * 60 * 1000,
  });
};
