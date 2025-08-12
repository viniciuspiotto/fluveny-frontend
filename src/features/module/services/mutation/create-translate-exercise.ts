import { api } from '@/app/libs/api';
import type { TranslateExerciseForm } from '../../schemas/translate-exercise-schema';

interface ModuleTranslateExerciseResponse {
  message: string;
  data: {
    id: string;
    header: string;
    phrase: string;
    template: string;
    justification: string;
  };
}

interface createTranslateExerciseRequest {
  data: TranslateExerciseForm;
  moduleId: string;
  grammarRuleId: string;
}

export const createTranslateExercise = async ({
  data,
  grammarRuleId,
  moduleId,
}: createTranslateExerciseRequest) => {
  const response = await api.post<ModuleTranslateExerciseResponse>(
    `/modules/${moduleId}/grammar-rule-modules/${grammarRuleId}/exercises`,
    data,
  );
  return response.data;
};
