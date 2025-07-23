import type { GrammarRuleTranslateExerciseData } from '@/features/module/schemas/grammar-rule-translate-exercise-schema';
import { createTranslateExercise } from '@/features/module/services/create-translate-exercise';
import { useMutation } from '@tanstack/react-query';

interface createTranslateExerciseRequest {
  data: GrammarRuleTranslateExerciseData;
  moduleId: string;
  grammarRuleModuleId: string;
}

export function useCreateTranslateExercise() {
  return useMutation({
    mutationFn: async ({
      data,
      moduleId,
      grammarRuleModuleId,
    }: createTranslateExerciseRequest) => {
      return await createTranslateExercise({
        data,
        moduleId,
        grammarRuleModuleId,
      });
    },
  });
}
