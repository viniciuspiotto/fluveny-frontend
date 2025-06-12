import type { GrammarRule, GrammarRuleModule, Level } from '@/@types/module';
import { api } from '@/app/libs/api';
import type { ModuleData } from '../schemas/module-schema';

interface ModuleCreateResponse {
  message: string;
  data: {
    id: string;
    title: string;
    description: string;
    level: Level;
    grammarRules: GrammarRule[];
    grammarRulesModule: GrammarRuleModule[];
  };
}

export const createModule = async (data: ModuleData) => {
  const response = await api.post<ModuleCreateResponse>('/modules', data);
  return response.data;
};
