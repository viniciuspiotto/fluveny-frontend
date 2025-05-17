import type { GrammarRule } from '@/@types/module';
import { useState } from 'react';
import { Tag } from '../tag';
import { SelectTopic } from './select-topic';

interface TopicsSelectionProps {
  onChange: (value: string[]) => void;
}

export const TopicsSelection = ({ onChange }: TopicsSelectionProps) => {
  const [selectedTopics, setSelectedTopics] = useState<GrammarRule[]>([]);

  const handleSelectTopic = (topics: GrammarRule[]) => {
    setSelectedTopics(topics);
    onChange(topics.map((t) => t.id));
  };

  return (
    <>
      <div className="grid grid-cols-[1fr_50px] items-center gap-4 lg:grid-cols-2">
        <SelectTopic value={selectedTopics} onSelectTopic={handleSelectTopic} />
        <span className="text-xl">{selectedTopics.length}/5</span>
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-1 gap-y-2">
        {selectedTopics.map((topic) => (
          <Tag key={topic.id} name={topic.title} variant="blue" />
        ))}
      </ul>
    </>
  );
};
