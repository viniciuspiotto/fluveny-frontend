import { useQuery } from '@tanstack/react-query';
import {
  getGrammarRules,
  type GetGrammarRulesResponse,
} from '../services/get-grammar-rules';

export const useGetGrammarRules = () => {
  return useQuery<GetGrammarRulesResponse>({
    queryKey: ['grammar-rule'],
    queryFn: getGrammarRules,
    staleTime: Infinity,
  });
};
