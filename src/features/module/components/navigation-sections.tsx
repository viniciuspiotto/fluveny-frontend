import { SectionButton } from './section-button';

const api = {
  // topics: [{ title: 'Simple Present' }, { title: 'Simple Past' }],
  topics: [
    {
      title: 'Simple Present',
      isModified: true,
    },
    {
      title: 'Simple Past',
      isModified: false,
    },
    {
      title: 'Past Perfect',
      isModified: true,
    },
  ],
};

export const NavigationSections = () => {
  return (
    <footer className="bg-primary fixed bottom-0 left-0 w-full overflow-x-auto whitespace-nowrap">
      <div className="md:flex md:justify-center">
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
        <SectionButton variant="finalChallenge" title="Desafio Final" />
        <SectionButton variant="revision" title="Revisão" />
      </div>
    </footer>
  );
};
