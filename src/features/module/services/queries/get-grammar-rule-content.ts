import type { WindowList } from '@/@types/module';
import { api } from '@/app/libs/api';

export interface GetGrammarRulesContentResponse {
  message: string;
  data: WindowList[];
}

interface GetGrammarRulesContentRequest {
  moduleId: string | undefined;
  grammarRuleModuleId: string | undefined;
}

export const getGrammarRulesContent = async ({
  moduleId,
  grammarRuleModuleId,
}: GetGrammarRulesContentRequest): Promise<GetGrammarRulesContentResponse> => {
  const response = await api.get(
    `/modules/${moduleId}/grammar-rule-modules/${grammarRuleModuleId}/contents`,
  );
  return response.data;
};
