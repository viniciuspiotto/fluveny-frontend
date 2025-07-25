import { useGetModule } from '../hooks/api/queries/use-get-module';
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

  return (
    <footer className="custom-scrollbar bg-primary fixed bottom-0 left-0 w-full overflow-x-auto">
      <div className="flex w-max items-center justify-center gap-4 px-8 py-4 xl:w-full">
        <SectionButton
          variant="introduction"
          title="Introdução"
          slug="introduction"
        />
        {response?.data.grammarRulesModule.map((grm) => {
          return (
            <SectionButton
              key={grm.id}
              variant="grammarRule"
              title={grm.grammarRule.title}
              slug={grm.id}
            />
          );
        })}
        <SectionButton
          disabled
          variant="finalChallenge"
          title="Desafio Final"
          slug="final-challenge"
        />
        <SectionButton
          variant="revision"
          disabled
          title="Revisão"
          slug="revision"
        />
      </div>
    </footer>
  );
};
