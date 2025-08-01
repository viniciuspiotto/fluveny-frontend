import type { GrammarRuleModuleWindow } from '@/@types/module';
import { api } from '@/app/libs/api';
import type { GrammarRulePresentationData } from '../schemas/grammar-rule-apresentation-schema';

interface CreateApresentationResponse {
  message: string;
  data: GrammarRuleModuleWindow;
}

interface createPresentationRequest {
  data: GrammarRulePresentationData;
  moduleId: string;
  grammarRuleModuleId: string;
}

export const createPresentation = async ({
  data,
  grammarRuleModuleId,
  moduleId,
}: createPresentationRequest) => {
  const response = await api.post<CreateApresentationResponse>(
    `/modules/${moduleId}/grammar-rule-modules/${grammarRuleModuleId}/presentation`,
    data,
  );
  return response.data;
};
