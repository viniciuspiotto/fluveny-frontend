import { Tag } from '../tag';
import { SelectTopic } from './select-topic';

export const TopicsSelection = () => {
  return (
    <>
      <div className="grid grid-cols-[1fr_50px] items-center gap-4 lg:grid-cols-2">
        <SelectTopic />
        <span className="text-xl">2/5</span>
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-1 gap-y-2">
        <Tag name="simple present" variant={'blue'} />
      </ul>
    </>
  );
};
