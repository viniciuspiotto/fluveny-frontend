import { api } from '@/app/libs/api';
import type { PresentationForm } from '../../schemas/presentation-schema';

interface ModulePresentationResponse {
  message: string;
  data: {
    title: string;
    textBlock: {
      content: string;
    };
  };
}

interface updatePresentationRequest {
  data: PresentationForm;
  moduleId: string;
  grammarRuleId: string;
  windowId: string;
}

export const updatePresentation = async ({
  data,
  grammarRuleId,
  moduleId,
  windowId,
}: updatePresentationRequest) => {
  const response = await api.put<ModulePresentationResponse>(
    `/modules/${moduleId}/grammar-rule-modules/${grammarRuleId}/presentation/${windowId}`,
    data,
  );
  return response.data;
};
