import { type Module } from '@/@types/module';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { ModuleCard } from '../module-card';
import { ModuleFilter } from '../panel/module-filter';

interface DraftsProps {
  modules?: Module[];
}

export const Drafts = ({ modules = [] }: DraftsProps) => {
  return (
    <div className="flex flex-col space-y-4 p-4 lg:space-y-5">
      <h1 className="mt-2 text-center text-3xl font-bold tracking-widest lg:mt-8 lg:text-4xl">
        Rascunhos
      </h1>
      <Button
        className="text-md ml-auto h-10 rounded-md px-6 font-normal lg:py-6 lg:text-lg"
        asChild
      >
        <Link to="/modules/new">Criar Módulo</Link>
      </Button>
      <ModuleFilter />

      {modules.length > 0 ? (
        <ul className="grid grid-rows-4 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
          {modules.map((module) => {
            return <ModuleCard key={module.id} {...module} />;
          })}
        </ul>
      ) : (
        <div className="flex w-full justify-center text-lg">
          Você não tem nenhum rascunho
        </div>
      )}
    </div>
  );
};
