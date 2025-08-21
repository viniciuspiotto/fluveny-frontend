import type { WindowListDTO } from '@/@types/module';
import { api } from '@/app/libs/api';

interface updateGrammarRuleWindowsRequest {
  data: WindowListDTO[];
  moduleId: string;
  grammarRuleId: string;
}

export const updateGrammarRuleWindows = async ({
  data,
  grammarRuleId,
  moduleId,
}: updateGrammarRuleWindowsRequest) => {
  const apiPayload = {
    contentList: data,
  };

  const response = await api.put(
    `/modules/${moduleId}/grammar-rule-modules/${grammarRuleId}`,
    apiPayload,
  );
  return response.data;
};
