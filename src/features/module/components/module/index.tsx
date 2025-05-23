import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useGetModule } from '../../hooks/api/queries/use-get-module';
import { getIntroduction } from '../../services/get-introduction';
import { useModuleInfo } from '../../store/use-module-info';
import { useModuleWizard } from '../../store/use-module-wizard';

export const Module = () => {
  const { setModuleId, moduleId } = useModuleInfo();
  const navigate = useNavigate();
  const { setStepModes, setStepCompletion } = useModuleWizard();

  const { id } = useParams();

  useEffect(() => {
    if (id && moduleId !== id) {
      setModuleId(id);
    }
  }, [id, moduleId, setModuleId]);

  const handleEditIntroduction = async () => {
    try {
      const response = await getIntroduction(id);
      if (response?.data) {
        setStepModes('introduction', 'edit');
        setStepCompletion('introduction', true);
      }
      navigate(`/modules/create/${id}/introduction`);
    } catch (error) {
      console.error('Erro ao buscar introdução:', error);
    }
  };

  const { data: module, isLoading, error } = useGetModule(id);

  if (isLoading) return <p>Loading...</p>;
  if (error || !module?.data) return <p>Erro ao carregar módulo</p>;

  const { title } = module.data;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="flex items-center gap-4">
        Módulo: <span className="text-xl font-bold">{title}</span>
      </h1>
      <Link to={`/modules/edit/${id}`}>
        <Button>Editar detalhes do módulo</Button>
      </Link>

      <Button onClick={handleEditIntroduction}>
        Editar introdução do módulo
      </Button>
    </div>
  );
};
