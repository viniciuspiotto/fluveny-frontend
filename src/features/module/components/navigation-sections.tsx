import { modulesMock } from '@/mocks/modules';
import { SectionButton } from './section-button';

const moduleTopics = modulesMock.flatMap((m) => m.topics);

export const NavigationSections = () => {
  return (
    <footer className="bg-primary fixed bottom-0 left-0 w-full overflow-x-auto">
      <div className="flex w-max items-center justify-center gap-4 px-8 py-4 lg:w-full">
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
