import { useGetModule } from '../hooks/use-get-module';
import { useModuleInfo } from '../store/use-module-info';
import { NavigationSectionsSkeleton } from './navigation-sections-skeleton';
import { SectionButton } from './section-button';

export const NavigationSections = () => {
  const { moduleId } = useModuleInfo();

  const { data: response, isLoading, isError } = useGetModule(moduleId);

  if (isLoading) return <NavigationSectionsSkeleton />;

  if (isError) {
    return (
      <footer className="bg-destructive fixed bottom-0 left-0 w-full px-8 py-4 text-center text-sm text-white">
        Erro ao carregar seções do módulo.
      </footer>
    );
  }

  const grammarRules = response?.data.grammarRules ?? [];

  return (
    <footer className="bg-primary fixed bottom-0 left-0 w-full overflow-x-auto">
      <div className="flex w-max items-center justify-center gap-4 px-8 py-4 lg:w-full">
        <SectionButton
          variant="introduction"
          title="Introdução"
          slug="introduction"
        />
        {grammarRules.map((grammarRule) => {
          return (
            <SectionButton
              key={grammarRule.id}
              variant="topic"
              title={grammarRule.title}
              slug={grammarRule.slug}
            />
          );
        })}
        <SectionButton
          variant="finalChallenge"
          title="Desafio Final"
          slug="final-challenge"
        />
        <SectionButton variant="revision" title="Revisão" slug="revision" />
      </div>
    </footer>
  );
};
