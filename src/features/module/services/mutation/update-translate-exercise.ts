import { api } from '@/app/libs/api';
import type { TranslateExerciseForm } from '../../schemas/translate-exercise-schema';

interface ModuleTranslateExerciseResponse {
  message: string;
  data: {
    grammarRuleId: string;
    header: string;
    phrase: string;
    template: string;
    justification: string;
  };
}

interface updateTranslateExerciseRequest {
  data: TranslateExerciseForm;
  moduleId: string;
  grammarRuleId: string;
  windowId: string;
}

export const updateTranslateExercise = async ({
  data,
  grammarRuleId,
  moduleId,
  windowId,
}: updateTranslateExerciseRequest) => {
  const response = await api.put<ModuleTranslateExerciseResponse>(
    `/modules/${moduleId}/grammar-rule-modules/${grammarRuleId}/exercises/${windowId}`,
    data,
  );
  return response.data;
};
