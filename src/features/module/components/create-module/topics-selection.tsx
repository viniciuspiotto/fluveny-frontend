import { Tag } from '../tag';
import { SelectTopic } from './select-topic';

interface TopicsSelectionProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const TopicsSelection = ({ value, onChange }: TopicsSelectionProps) => {
  const handleSelectTopic = (topics: string[]) => {
    onChange(topics);
  };

  return (
    <>
      <div className="grid grid-cols-[1fr_50px] items-center gap-4 lg:grid-cols-2">
        <SelectTopic onSelectTopic={handleSelectTopic} />
        <span className="text-xl">{value?.length || '0'}/5</span>
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-1 gap-y-2">
        {value &&
          value.map((topic, index) => {
            return (
              <Tag
                key={index}
                name={topic.split('-').join(' ')}
                variant="blue"
              />
            );
          })}
      </ul>
    </>
  );
};
