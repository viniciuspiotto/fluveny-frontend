import { ROUTES } from '@/app/configs/routes';
import { NotFound } from '@/components/not-found';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router';
import { Back } from '../../../components/back';
import { DraftsSkeleton } from '../components/drafts-skeleton';
import { ModuleCard } from '../components/module-card';
import { ModuleFilter } from '../components/module-filter';
import { useGetModules } from '../hooks/api/queries/use-get-modules';

export const DraftsPage = () => {
  const { modules, isLoading, isError } = useGetModules();
  const navigator = useNavigate();

  if (isLoading) {
    return <DraftsSkeleton />;
  }

  if (isError || !modules) {
    return <NotFound />;
  }

  return (
    <div className="relative flex flex-col space-y-4 p-4 lg:space-y-5">
      <h1 className="mt-2 text-center text-3xl font-bold tracking-widest lg:mt-8 lg:text-4xl">
        Rascunhos
      </h1>
      <Back
        className="absolute top-4 z-10 lg:top-10"
        onClick={() => navigator(ROUTES.modules)}
      />
      <Button
        className="text-md ml-auto h-10 rounded-md px-6 font-normal lg:py-6 lg:text-lg"
        asChild
      >
        <Link to={`${ROUTES.modules}/${ROUTES.create}`}>Criar Módulo</Link>
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
