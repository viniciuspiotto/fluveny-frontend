import type { TranslateExerciseForm } from '@/features/module/schemas/translate-exercise-schema';
import { updateTranslateExercise } from '@/features/module/services/mutation/update-translate-exercise';
import { useMutation } from '@tanstack/react-query';

interface updateTranslateExerciseRequest {
  data: TranslateExerciseForm;
  moduleId: string;
  grammarRuleId: string;
  windowId: string;
}

export function useUpdateTranslateExercise() {
  return useMutation({
    mutationFn: async ({
      data,
      moduleId,
      grammarRuleId,
      windowId,
    }: updateTranslateExerciseRequest) => {
      const response = await updateTranslateExercise({
        data,
        moduleId,
        grammarRuleId,
        windowId,
      });
      return response.data;
    },
  });
}
