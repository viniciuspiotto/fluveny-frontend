import {
  getGrammarRule,
  type GetGrammarRuleResponse,
} from '@/features/module/services/queries/get-grammar-rule';
import { useQuery } from '@tanstack/react-query';

export const useGetGrammarRule = (id: string) => {
  const { data, ...rest } = useQuery<GetGrammarRuleResponse>({
    queryKey: ['grammar-rule', id],
    queryFn: () => getGrammarRule(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });

  return { data: data?.data, ...rest };
};
