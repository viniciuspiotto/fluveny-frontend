import type {
  GrammarRule,
  GrammarRuleModuleIdAndTitle,
  Level,
} from '@/@types/module';
import { api } from '@/app/libs/api';
import type { ModuleForm } from '../../schemas/module-form-schema';

interface ModuleCreateResponse {
  message: string;
  data: {
    id: string;
    title: string;
    description: string;
    level: Level;
    grammarRules: GrammarRule[];
    grammarRulesModule: GrammarRuleModuleIdAndTitle[];
  };
}

export const createModule = async (data: ModuleForm) => {
  const response = await api.post<ModuleCreateResponse>('/modules', data);
  return response.data;
};
