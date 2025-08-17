import {
  getIntroduction,
  type GetIntroductionResponse,
} from '@/features/module/services/queries/get-introduction';
import { useQuery } from '@tanstack/react-query';

export const useGetIntroduction = (id: string | undefined) => {
  const { data, ...rest } = useQuery<GetIntroductionResponse>({
    queryKey: ['introduction', id],
    queryFn: () => getIntroduction(id!),
    enabled: !!id,
  });

  return { data: data?.data, ...rest };
};
