import type { ModuleCardProps } from '@/@types/module';
import { Tag } from './tag';

export const ModuleCard = ({ title, topics }: ModuleCardProps) => {
  return (
    <div className="flex h-40 flex-1 flex-col justify-between rounded-md bg-[url(/img/party.webp)] bg-cover bg-center p-4 lg:h-60 lg:p-6">
      <span className="text-2xl font-bold text-zinc-50 lg:text-3xl">
        {title}
      </span>
      <ul className="flex gap-2">
        {topics.map((topic) => {
          return <Tag key={topic.id} name={topic.name} />;
        })}
      </ul>
    </div>
  );
};
