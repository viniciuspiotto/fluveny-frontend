import type { GrammarRuleModuleIdAndTitle } from '@/@types/module';
import { api } from '@/app/libs/api';

export interface GetGrammarRulesResponse {
  message: string;
  data: GrammarRuleModuleIdAndTitle[];
}

export const getAllGrammarRuleModule = async (
  moduleId: string | undefined,
): Promise<GetGrammarRulesResponse> => {
  const response = await api.get(`/modules/${moduleId}/grammar-rule-modules`);
  return response.data;
};
