import { api } from '@/app/libs/api';
import type { GrammarRuleTranslateExerciseData } from '../schemas/grammar-rule-translate-exercise-schema';

interface ModuleTranslateExerciseResponse {
  message: string;
  data: {
    grammarRuleModuleId: string;
    header: string;
    phrase: string;
    template: string;
    justification: string;
  };
}

interface createTranslateExerciseRequest {
  data: GrammarRuleTranslateExerciseData;
  moduleId: string;
  grammarRuleModuleId: string;
}

export const createTranslateExercise = async ({
  data,
  grammarRuleModuleId,
  moduleId,
}: createTranslateExerciseRequest) => {
  const response = await api.post<ModuleTranslateExerciseResponse>(
    `/modules/${moduleId}/grammar-rule-modules/${grammarRuleModuleId}/exercises`,
    data,
  );
  return response.data;
};
