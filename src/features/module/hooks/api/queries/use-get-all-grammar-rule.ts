import { getAllGrammarRuleModule } from '@/features/module/services/queries/get-all-grammar-rule-module';
import { useQuery } from '@tanstack/react-query';

export const useGetAllGrammarRule = (moduleId: string | undefined) => {
  const { data, ...rest } = useQuery({
    queryKey: ['grammar-rule-module', moduleId],
    queryFn: () => getAllGrammarRuleModule(moduleId!),
    enabled: !!moduleId,
  });

  return { data: data?.data, ...rest };
};
