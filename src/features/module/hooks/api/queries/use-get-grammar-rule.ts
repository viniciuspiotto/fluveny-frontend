import {
  getGrammarRule,
  type GetGrammarRuleResponse,
} from '@/features/module/services/get-grammar-rule';
import { useQuery } from '@tanstack/react-query';

export const useGetGrammarRule = (id: string) => {
  return useQuery<GetGrammarRuleResponse>({
    queryKey: ['grammar-rule', id],
    queryFn: () => getGrammarRule(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};
