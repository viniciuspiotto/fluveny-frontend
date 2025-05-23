import {
  getLevels,
  type GetLevelsResponse,
} from '@/features/module/services/get-levels';
import { useQuery } from '@tanstack/react-query';

export const useGetLevels = () => {
  return useQuery<GetLevelsResponse>({
    queryKey: ['levels'],
    queryFn: getLevels,
    staleTime: Infinity,
  });
};
