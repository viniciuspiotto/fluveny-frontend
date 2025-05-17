import { useQuery } from '@tanstack/react-query';
import { getLevels, type GetLevelsResponse } from '../services/get-levels';

export const useGetLevels = () => {
  return useQuery<GetLevelsResponse>({
    queryKey: ['levels'],
    queryFn: getLevels,
    staleTime: Infinity,
  });
};
