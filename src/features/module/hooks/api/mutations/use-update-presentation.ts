import type { PresentationForm } from '@/features/module/schemas/presentation-schema';
import { updatePresentation } from '@/features/module/services/mutation/update-presentation';
import { useMutation } from '@tanstack/react-query';

interface updatePresentationRequest {
  data: PresentationForm;
  moduleId: string;
  grammarRuleId: string;
  windowId: string;
}

export function useUpdatePresentation() {
  return useMutation({
    mutationFn: async ({
      data,
      moduleId,
      grammarRuleId,
      windowId,
    }: updatePresentationRequest) => {
      const response = await updatePresentation({
        data,
        moduleId,
        grammarRuleId,
        windowId,
      });
      return response.data;
    },
  });
}
