import type { GrammarRulePresentationData } from '@/features/module/schemas/grammar-rule-apresentation-schema';
import { createPresentation } from '@/features/module/services/create-presentation';
import { useMutation } from '@tanstack/react-query';

interface createPresentationRequest {
  data: GrammarRulePresentationData;
  moduleId: string;
  grammarRuleModuleId: string;
}

export function useCreatePresentation() {
  return useMutation({
    mutationFn: async ({
      data,
      moduleId,
      grammarRuleModuleId,
    }: createPresentationRequest) => {
      return await createPresentation({ data, moduleId, grammarRuleModuleId });
    },
  });
}
