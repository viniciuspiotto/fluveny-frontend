import {
  getLevels,
  type GetLevelsResponse,
} from '@/features/module/services/queries/get-levels';
import { useQuery } from '@tanstack/react-query';

export const useGetLevels = () => {
  const { data, ...rest } = useQuery<GetLevelsResponse>({
    queryKey: ['levels'],
    queryFn: getLevels,
    staleTime: Infinity,
  });

  return { data: data?.data, ...rest };
};
