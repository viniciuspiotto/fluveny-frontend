import type { GrammarRule } from '@/@types/module';
import { create } from 'zustand';

interface ModuleInfoState {
  moduleId: string;
  grammarRules: GrammarRule[];
  setModuleId: (id: string) => void;
  setGrammarRules: (rules: GrammarRule[]) => void;
  clearModuleInfo: () => void;
}

export const useModuleInfo = create<ModuleInfoState>((set) => ({
  moduleId: '',
  grammarRules: [],
  setModuleId: (id) => set({ moduleId: id }),
  setGrammarRules: (rules) => set({ grammarRules: rules }),
  clearModuleInfo: () => set({ grammarRules: [] }),
}));
