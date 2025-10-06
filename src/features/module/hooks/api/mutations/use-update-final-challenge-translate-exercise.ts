import type { TranslateExerciseForm } from '@/features/module/schemas/translate-exercise-schema';
import { updateFinalChallengeTranslateExercise } from '@/features/module/services/mutation/update-final-challenge-translate-exercise';
import { useMutation } from '@tanstack/react-query';

interface updateFinalChallengeTranslateExerciseRequest {
  data: TranslateExerciseForm;
  moduleId: string;
  exerciseId: string;
}

export function useUpdateFinalChallengeTranslateExercise() {
  return useMutation({
    mutationFn: async ({
      data,
      moduleId,
      exerciseId,
    }: updateFinalChallengeTranslateExerciseRequest) => {
      const response = await updateFinalChallengeTranslateExercise({
        data,
        moduleId,
        exerciseId,
      });
      return response.data;
    },
  });
}
