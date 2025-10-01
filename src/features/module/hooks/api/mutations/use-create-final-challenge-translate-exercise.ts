import type { TranslateExerciseForm } from '@/features/module/schemas/translate-exercise-schema';
import { createFinalChallengeTranslateExercise } from '@/features/module/services/mutation/create-final-challenge-translate-exercise';
import { useMutation } from '@tanstack/react-query';

interface createFinalChallengeTranslateExerciseRequest {
  data: TranslateExerciseForm;
  moduleId: string;
}

export function useCreateFinalChallengeTranslateExercise() {
  return useMutation({
    mutationFn: async ({
      data,
      moduleId,
    }: createFinalChallengeTranslateExerciseRequest) => {
      const response = await createFinalChallengeTranslateExercise({
        data,
        moduleId,
      });

      return response.data;
    },
  });
}
