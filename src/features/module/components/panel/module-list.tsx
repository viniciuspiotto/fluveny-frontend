import type { ModuleCardProps } from '@/@types/module';
import { ModuleCard } from '../module-card';

interface ModuleListProps {
  modules: ModuleCardProps[];
}

export const ModuleList = ({ modules }: ModuleListProps) => {
  return (
    <ul className="grid grid-rows-4 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
      {modules.map((module) => {
        return <ModuleCard key={module.id} {...module} />;
      })}
    </ul>
  );
};
