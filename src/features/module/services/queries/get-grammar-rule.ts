import type { GrammarRule } from '@/@types/module';
import { api } from '@/app/libs/api';

export interface GetGrammarRuleResponse {
  message: string;
  data: GrammarRule;
}

export const getGrammarRule = async (
  id: string,
): Promise<GetGrammarRuleResponse> => {
  const response = await api.get(`/grammar-rules/${id}`);
  return response.data;
};
