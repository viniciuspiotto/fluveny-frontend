import { ROUTES } from '@/app/configs/routes';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth-store';
import { LoadingScreen } from '@/templates/loading-screen';
import { NotFound } from '@/templates/not-found';
import { useQueryStates } from 'nuqs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ModuleCard } from '../components/module-card';
import { ModuleFilter, parsers } from '../components/module-filter';
import { useGetSearchStudentModules } from '../hooks/api/queries/use-get-search-student-modules';

const permittedRoles = ['ADMIN', 'CONTENT_CREATOR'];

export const PanelPage = () => {
  const { user } = useAuthStore();

  const [filters] = useQueryStates(parsers);
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [filters]);

  const { modules, isLoading, isError } = useGetSearchStudentModules({
    moduleName: debouncedFilters.q,
    grammarRulesId: debouncedFilters.grammarRules,
    levelId: debouncedFilters.levels,
    status: debouncedFilters.statuses,
  });

  const canViewDrafts = user && permittedRoles.includes(user.role);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingScreen />;
    }

    if (isError) {
      return <NotFound />;
    }

    if (!modules || modules.length === 0) {
      return (
        <div className="flex w-full justify-center text-lg">
          Nenhum módulo encontrado com os filtros aplicados.
        </div>
      );
    }

    return (
      <ul className="grid grid-rows-4 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:gap-6">
        {modules.map((module) => (
          <ModuleCard key={module.id} {...module} />
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col space-y-4 p-4 lg:space-y-5">
      <h1 className="mt-2 text-center text-3xl font-bold tracking-widest lg:mt-8 lg:text-4xl">
        Módulos
      </h1>
      {canViewDrafts && (
        <Button
          className="text-md ml-auto h-10 rounded-md px-6 font-normal lg:py-6 lg:text-lg"
          asChild
        >
          <Link to={`${ROUTES.drafts}`}>Rascunhos</Link>
        </Button>
      )}

      <ModuleFilter />

      {renderContent()}
    </div>
  );
};
