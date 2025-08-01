import type { GrammarRuleModuleWindow } from '@/@types/module';
import { api } from '@/app/libs/api';

export interface GetGrammarRulesContentResponse {
  message: string;
  data: GrammarRuleModuleWindow[];
}

interface GetGrammarRulesContentRequest {
  moduleId: string;
  grammarRuleModuleId: string;
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
