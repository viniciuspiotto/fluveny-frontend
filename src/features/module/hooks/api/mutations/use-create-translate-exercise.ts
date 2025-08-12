import type { TranslateExerciseForm } from '@/features/module/schemas/translate-exercise-schema';
import { createTranslateExercise } from '@/features/module/services/mutation/create-translate-exercise';
import { useMutation } from '@tanstack/react-query';

interface createTranslateExerciseRequest {
  data: TranslateExerciseForm;
  moduleId: string;
  grammarRuleId: string;
}

export function useCreateTranslateExercise() {
  return useMutation({
    mutationFn: async ({
      data,
      moduleId,
      grammarRuleId,
    }: createTranslateExerciseRequest) => {
      const response = await createTranslateExercise({
        data,
        moduleId,
        grammarRuleId,
      });

      return response.data;
    },
  });
}
