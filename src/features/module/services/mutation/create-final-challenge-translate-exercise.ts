import { api } from '@/app/libs/api';
import type { TranslateExerciseForm } from '../../schemas/translate-exercise-schema';

interface ModuleFinalChallengeTranslateExerciseResponse {
  message: string;
  data: {
    id: string;
    header: string;
    phrase: string;
    template: string;
    justification: string;
  };
}

interface createFinalChallengeTranslateExerciseRequest {
  data: TranslateExerciseForm;
  moduleId: string;
}

export const createFinalChallengeTranslateExercise = async ({
  data,
  moduleId,
}: createFinalChallengeTranslateExerciseRequest) => {
  const response =
    await api.post<ModuleFinalChallengeTranslateExerciseResponse>(
      `/modules/${moduleId}/final-challenge`,
      data,
    );
  return response.data;
};
