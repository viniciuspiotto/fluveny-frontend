import type { GrammarRule, GrammarRuleModule, Level } from '@/@types/module';
import { api } from '@/app/libs/api';
import type { GrammarRulePresentationData } from '../schemas/grammar-rule-apresentation-schema';

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

interface createPresentationRequest {
  data: GrammarRulePresentationData;
  moduleId: string;
  grammarRuleModuleId: string;
}

export const createPresentation = async ({
  data,
  grammarRuleModuleId,
  moduleId,
}: createPresentationRequest) => {
  const response = await api.post<ModuleCreateResponse>(
    `/modules/${moduleId}/grammar-rules-module/${grammarRuleModuleId}/presentation`,
    data,
  );
  return response.data;
};
