import {
  getIntroduction,
  type GetIntroductionResponse,
} from '@/features/module/services/queries/get-introduction';
import { useQuery } from '@tanstack/react-query';

export const useGetIntroduction = (id: string | undefined) => {
  const { data, ...rest } = useQuery<GetIntroductionResponse>({
    queryKey: ['introduction', id],
    queryFn: () => getIntroduction(id!),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });

  return { data: data?.data, ...rest };
};
