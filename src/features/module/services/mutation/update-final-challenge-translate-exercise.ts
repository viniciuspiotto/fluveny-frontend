import { api } from '@/app/libs/api';
import type { TranslateExerciseForm } from '../../schemas/translate-exercise-schema';

interface ModuleFinalChallengeTranslateExerciseResponse {
  message: string;
  data: {
    grammarRuleId: string;
    header: string;
    phrase: string;
    template: string;
    justification: string;
  };
}

interface updateFinalChallengeTranslateExerciseRequest {
  data: TranslateExerciseForm;
  moduleId: string;
  exerciseId: string;
}

export const updateFinalChallengeTranslateExercise = async ({
  data,
  moduleId,
  exerciseId,
}: updateFinalChallengeTranslateExerciseRequest) => {
  const response = await api.put<ModuleFinalChallengeTranslateExerciseResponse>(
    `/modules/${moduleId}/final-challenge/${exerciseId}`,
    data,
  );
  return response.data;
};
