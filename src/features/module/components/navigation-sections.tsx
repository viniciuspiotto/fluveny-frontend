import { SectionButton } from './section-button';

const api = {
  // topics: [{ title: 'Simple Present' }, { title: 'Simple Past' }],
  topics: [
    { title: 'Simple Present' },
    { title: 'Simple Past' },
    { title: 'Past Perfect' },
  ],
};

export const NavigationSections = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full">
      <div className="bg-primary overflow-x-auto whitespace-nowrap">
        <SectionButton variant="introduction" isCompleted />
        {api.topics.map((topic) => {
          return <SectionButton key={topic.title} variant="topic" />;
        })}
        <SectionButton variant="finalChallenge" />
        <SectionButton variant="revision" />
      </div>
    </footer>
  );
};
