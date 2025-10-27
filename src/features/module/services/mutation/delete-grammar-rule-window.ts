import { api } from '@/app/libs/api';

export const deleteGrammarRuleWindow = async (
  moduleId: string,
  grammarRuleId: string,
  windowId: string,
) => {
  const response = await api.delete(
    `/modules/${moduleId}/grammar-rule-modules/${grammarRuleId}/contents/${windowId}`,
  );
  return response.data;
};
