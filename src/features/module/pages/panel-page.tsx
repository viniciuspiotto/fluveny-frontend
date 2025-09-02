import { ROUTES } from '@/app/configs/routes';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { ModuleFilter } from '../components/module-filter';
import { PanelSkeleton } from '../components/panel-skeleton';

export const PanelPage = () => {
  const isLoading = false;

  if (isLoading) {
    return <PanelSkeleton />;
  }

  return (
    <div className="flex flex-col space-y-4 p-4 lg:space-y-5">
      <h1 className="mt-2 text-center text-3xl font-bold tracking-widest lg:mt-8 lg:text-4xl">
        Módulos
      </h1>
      <Button
        className="text-md ml-auto h-10 rounded-md px-6 font-normal lg:py-6 lg:text-lg"
        asChild
      >
        <Link to={`${ROUTES.drafts}`}>Rascunhos</Link>
      </Button>
      <ModuleFilter />
      <div className="flex w-full justify-center text-lg">
        Não existem módulos criados
      </div>
    </div>
  );
};
