import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useGetModule } from '../../hooks/api/queries/use-get-module';
import { useModuleInfo } from '../../store/use-module-info';

export const Module = () => {
  const navigate = useNavigate();
  const { moduleId } = useModuleInfo();

  const { data: module, isLoading, error } = useGetModule(moduleId);

  if (isLoading) return <p>Loading...</p>;
  if (error || !module?.data) return <p>Erro ao carregar módulo</p>;

  const { title } = module.data;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <h1 className="flex items-center gap-4">
        Módulo: <span className="text-xl font-bold">{title}</span>
      </h1>

      <Button onClick={() => navigate(`/modules/edit/${moduleId}`)}>
        Editar detalhes do módulo
      </Button>
    </div>
  );
};
