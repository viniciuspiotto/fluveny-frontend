import { Button } from '@/components/ui/button';
import { modulesMock } from '@/mocks/modules';
import { Link } from 'react-router';
import { ModuleFilter } from './module-filter';
import { ModuleList } from './module-list';

export function Panel() {
  return (
    <div className="flex flex-col space-y-4 lg:space-y-5">
      <h1 className="text-center text-3xl font-bold tracking-widest lg:text-4xl">
        Módulos
      </h1>
      <Button
        className="text-md ml-auto h-10 rounded-md px-6 font-normal lg:py-6 lg:text-lg"
        asChild
      >
        <Link to="drafts">Rascunhos</Link>
      </Button>
      <ModuleFilter />
      <ModuleList modules={modulesMock} />
    </div>
  );
}
