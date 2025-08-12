import {
  getModules,
  type GetModulesResponse,
} from '@/features/module/services/queries/get-modules';
import { useQuery } from '@tanstack/react-query';

export const useGetModules = () => {
  const { data, ...rest } = useQuery<GetModulesResponse>({
    queryKey: ['modules'],
    queryFn: getModules,
  });

  return { modules: data?.data, ...rest };
};
