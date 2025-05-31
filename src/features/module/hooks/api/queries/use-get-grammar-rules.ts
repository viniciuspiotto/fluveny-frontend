import {
  getGrammarRules,
  type GetGrammarRulesResponse,
} from '@/features/module/services/get-grammar-rules';
import { useQuery } from '@tanstack/react-query';

export const useGetGrammarRules = () => {
  return useQuery<GetGrammarRulesResponse>({
    queryKey: ['grammar-rule'],
    queryFn: getGrammarRules,
    staleTime: Infinity,
  });
};
