export type grammarRule = {
  id: string;
  name: string;
};

export type Level = {
  id: string;
  title: string;
  experienceValue: number;
};

export type GrammarRule = {
  id: string;
  title: string;
  slug: string;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  level: Level;
  grammarRules: GrammarRule[];
  grammarRulesModule: GrammarRuleModule[];
};

export interface ModuleCardProps {
  id: string;
  title: string;
  imgSrc: string;
  grammarRules: grammarRule[];
}

export interface GrammarRuleModule {
  id: string;
  moduleId: string;
  grammarRuleId: string;
  contentList: ContentList[];
}

type ContentList = {
  type: 'EXERCISE' | 'APRESENTATION';
  id: string;
};

type TextBlock = {
  id: string;
  content: string;
};

export interface Introduction {
  idModule: string;
  textBlock: TextBlock;
}

export type StepMode = 'create' | 'edit';
