import type { GrammarRule } from '@/@types/module';
import { api } from '@/app/libs/api';

export interface GetGrammarRulesResponse {
  message: string;
  data: GrammarRule[];
}

export const getGrammarRules = async (): Promise<GetGrammarRulesResponse> => {
  const response = await api.get('/grammar-rules');
  return response.data;
};
