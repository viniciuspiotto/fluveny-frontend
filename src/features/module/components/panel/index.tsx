import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { useGetModules } from '../../hooks/use-get-modules';
import { ModuleFilter } from './module-filter';
import { ModuleList } from './module-list';

export function Panel() {
  const { data: response } = useGetModules();

  const modules = response?.data ?? [];

  return (
    <div className="flex flex-col space-y-4 p-4 lg:space-y-5">
      <h1 className="mt-2 text-center text-3xl font-bold tracking-widest lg:mt-8 lg:text-4xl">
        Módulos
      </h1>
      <Button
        className="text-md ml-auto h-10 rounded-md px-6 font-normal lg:py-6 lg:text-lg"
        asChild
      >
        <Link to="drafts">Rascunhos</Link>
      </Button>
      <ModuleFilter />
      <ModuleList modules={modules} />
    </div>
  );
}
