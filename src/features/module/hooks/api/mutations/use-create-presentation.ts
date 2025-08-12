import type { PresentationForm } from '@/features/module/schemas/presentation-schema';
import { createPresentation } from '@/features/module/services/mutation/create-presentation';
import { useMutation } from '@tanstack/react-query';

interface createPresentationRequest {
  data: PresentationForm;
  moduleId: string;
  grammarRuleId: string;
}

export const useCreatePresentation = () => {
  return useMutation({
    mutationFn: async ({
      data,
      moduleId,
      grammarRuleId,
    }: createPresentationRequest) => {
      const response = await createPresentation({
        data,
        moduleId,
        grammarRuleId,
      });
      return response.data;
    },
  });
};
