import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useGetModule } from '../../hooks/api/queries/use-get-module';
import { getIntroduction } from '../../services/get-introduction';
import { useModuleInfo } from '../../store/use-module-info';
import { useModuleWizard } from '../../store/use-module-wizard';

export const Module = () => {
  const [hasIntroduction, setHasIntroduction] = useState<boolean | null>(null);
  const { moduleId } = useModuleInfo();
  const navigate = useNavigate();
  const { setStepModes, setStepCompletion } = useModuleWizard();

  useEffect(() => {
    const checkIntroduction = async () => {
      if (!moduleId) return;
      try {
        const response = await getIntroduction(moduleId);
        setHasIntroduction(!!response?.data);
      } catch (error) {
        console.error('Erro ao verificar introdução:', error);
        setHasIntroduction(false);
      }
    };

    checkIntroduction();
  }, [moduleId]);

  const handleEditIntroduction = async () => {
    try {
      const response = await getIntroduction(moduleId);
      if (response?.data) {
        setStepModes('introduction', 'edit');
        setStepCompletion('introduction', true);
      }
      navigate(`/modules/create/${moduleId}/introduction`);
    } catch (error) {
      console.error('Erro ao buscar introdução:', error);
    }
  };

  const { data: module, isLoading, error } = useGetModule(moduleId);

  if (isLoading) return <p>Loading...</p>;
  if (error || !module?.data) return <p>Erro ao carregar módulo</p>;

  const { title } = module.data;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="flex items-center gap-4">
        Módulo: <span className="text-xl font-bold">{title}</span>
      </h1>
      <Link to={`/modules/edit/${moduleId}`}>
        <Button>Editar detalhes do módulo</Button>
      </Link>

      <Button onClick={handleEditIntroduction} disabled={!hasIntroduction}>
        Editar introdução do módulo
      </Button>
    </div>
  );
};
