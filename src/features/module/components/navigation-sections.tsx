import { useGetGrammarRules } from '../hooks/use-get-grammar-rules';
import { SectionButton } from './section-button';

export const NavigationSections = () => {
  const { data: response } = useGetGrammarRules();

  const grammarRules = response?.data ?? [];

  return (
    <footer className="bg-primary fixed bottom-0 left-0 w-full overflow-x-auto">
      <div className="flex w-max items-center justify-center gap-4 px-8 py-4 lg:w-full">
        <SectionButton variant="introduction" title="Introdução" />
        {grammarRules.map((grammarRule) => {
          return (
            <SectionButton
              key={grammarRule.title}
              variant="topic"
              title={grammarRule.title}
            />
          );
        })}
        <SectionButton variant="finalChallenge" title="Desafio Final" />
        <SectionButton variant="revision" title="Revisão" />
      </div>
    </footer>
  );
};
