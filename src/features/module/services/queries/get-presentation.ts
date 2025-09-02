import type { Presentation } from '@/@types/module';
import { api } from '@/app/libs/api';

export interface GetPresentationResponse {
  message: string;
  data: Presentation;
}

export interface GetPresentationRequest {
  moduleId: string | undefined;
  grammarRuleId: string | undefined;
  windowId: string | undefined;
}

export const getPresentation = async ({
  moduleId,
  grammarRuleId,
  windowId,
}: GetPresentationRequest): Promise<GetPresentationResponse> => {
  const response = await api.get(
    `/modules/${moduleId}/grammar-rule-modules/${grammarRuleId}/presentation/${windowId}`,
  );
  return response.data;
};
