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
};

export interface ModuleCardProps {
  id: string;
  title: string;
  imgSrc: string;
  grammarRules: grammarRule[];
}
