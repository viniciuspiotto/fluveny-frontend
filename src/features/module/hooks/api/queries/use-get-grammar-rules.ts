import {
  getGrammarRules,
  type GetGrammarRulesResponse,
} from '@/features/module/services/queries/get-grammar-rules';
import { useQuery } from '@tanstack/react-query';

export const useGetGrammarRules = () => {
  const { data, ...rest } = useQuery<GetGrammarRulesResponse>({
    queryKey: ['grammar-rule'],
    queryFn: getGrammarRules,
    staleTime: Infinity,
  });

  return { data: data?.data, ...rest };
};
