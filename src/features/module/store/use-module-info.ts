import type { GrammarRuleModule } from '@/@types/module';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ModuleInfoState {
  moduleId: string;
  grammarRulesModules: GrammarRuleModule[];
  setModuleId: (id: string) => void;
  setGrammarRulesModules: (rules: GrammarRuleModule[]) => void;
  clearModuleInfo: () => void;
}

export const useModuleInfo = create<ModuleInfoState>()(
  persist(
    (set) => ({
      moduleId: '',
      grammarRulesModules: [],
      setModuleId: (id) => set({ moduleId: id }),
      setGrammarRulesModules: (rules) => set({ grammarRulesModules: rules }),
      clearModuleInfo: () => set({ moduleId: '', grammarRulesModules: [] }),
    }),
    {
      name: 'module-info-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        moduleId: state.moduleId,
        grammarRules: state.grammarRulesModules,
      }),
    },
  ),
);
