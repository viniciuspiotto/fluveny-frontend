import {
  getGrammarRulesContent,
  type GetGrammarRulesContentResponse,
} from '@/features/module/services/get-grammar-rule-content';
import { useQuery } from '@tanstack/react-query';

export const useGetGrammarRuleContent = (
  moduleId: string | undefined,
  grammarRuleModuleId: string | undefined,
  options?: { enabled?: boolean },
) => {
  return useQuery<GetGrammarRulesContentResponse>({
    queryKey: ['grammar-rule-module', grammarRuleModuleId],
    queryFn: () => {
      if (!moduleId || !grammarRuleModuleId) {
        return Promise.reject(
          new Error('moduleId e grammarRuleModuleId são obrigatórios.'),
        );
      }
      return getGrammarRulesContent({ moduleId, grammarRuleModuleId });
    },
    ...options,
  });
};
