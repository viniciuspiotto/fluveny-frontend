import type { GrammarRuleModuleWindow } from '@/@types/module';
import { api } from '@/app/libs/api';
import type { PresentationForm } from '../../schemas/presentation-schema';

interface CreateApresentationResponse {
  message: string;
  data: GrammarRuleModuleWindow;
}

interface createPresentationRequest {
  data: PresentationForm;
  moduleId: string;
  grammarRuleId: string;
}

export const createPresentation = async ({
  data,
  grammarRuleId,
  moduleId,
}: createPresentationRequest) => {
  const response = await api.post<CreateApresentationResponse>(
    `/modules/${moduleId}/grammar-rule-modules/${grammarRuleId}/presentation`,
    data,
  );
  return response.data;
};
