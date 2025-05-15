import { SectionButton } from './section-button';

const api = {
  topics: [
    {
      title: 'Past Perfect',
      isModified: false,
    },
    {
      title: 'Past Perfect',
      isModified: false,
    },
    {
      title: 'Past Perfect',
      isModified: false,
    },
  ],
};

export const NavigationSections = () => {
  return (
    <footer className="bg-primary fixed bottom-0 left-0 w-full">
      <div className="flex w-full items-center gap-4 overflow-x-auto px-8 py-4 whitespace-nowrap md:justify-center">
        <SectionButton variant="introduction" title="Introdução" isStarted />
        {api.topics.map((topic) => {
          return (
            <SectionButton
              key={topic.title}
              variant="topic"
              title={topic.title}
              isStarted={topic.isModified}
            />
          );
        })}
        <SectionButton
          isStarted={false}
          variant="finalChallenge"
          title="Desafio Final"
        />
        <SectionButton isStarted={false} variant="revision" title="Revisão" />
      </div>
    </footer>
  );
};
