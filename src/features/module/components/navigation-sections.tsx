import { modulesMock } from '@/mocks/modules';
import { SectionButton } from './section-button';

export const NavigationSections = () => {
  const moduleTopics = modulesMock.flatMap((m) => m.topics);

  return (
    <footer className="bg-primary fixed bottom-0 left-0 w-full">
      <div className="flex w-full items-center gap-4 overflow-x-auto px-8 py-4 whitespace-nowrap md:justify-center">
        <SectionButton variant="introduction" title="Introdução" />
        {moduleTopics.map((topic) => {
          return (
            <SectionButton
              key={topic.name}
              variant="topic"
              title={topic.name}
            />
          );
        })}
        <SectionButton variant="finalChallenge" title="Desafio Final" />
        <SectionButton variant="revision" title="Revisão" />
      </div>
    </footer>
  );
};
