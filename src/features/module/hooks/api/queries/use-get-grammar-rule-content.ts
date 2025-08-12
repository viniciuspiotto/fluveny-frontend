import {
  getGrammarRulesContent,
  type GetGrammarRulesContentResponse,
} from '@/features/module/services/queries/get-grammar-rule-content';
import { useQuery } from '@tanstack/react-query';

export const useGetGrammarRuleContent = (
  moduleId: string | undefined,
  grammarRuleModuleId: string | undefined,
) => {
  const { data, ...rest } = useQuery<GetGrammarRulesContentResponse>({
    queryKey: ['grammar-rule-module', grammarRuleModuleId],
    queryFn: () => getGrammarRulesContent({ moduleId, grammarRuleModuleId }),
    enabled: !!moduleId && !!grammarRuleModuleId,
  });

  return { data: data?.data, ...rest };
};
