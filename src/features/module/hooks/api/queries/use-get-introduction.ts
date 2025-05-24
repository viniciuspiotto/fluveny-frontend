import {
  getIntroduction,
  type GetIntroductionResponse,
} from '@/features/module/services/get-introduction';
import { useQuery } from '@tanstack/react-query';

export const useGetIntroduction = (id: string, enabled = true) => {
  return useQuery<GetIntroductionResponse>({
    queryKey: ['introduction', id],
    queryFn: () => getIntroduction(id),
    enabled: !!id && enabled,
  });
};
