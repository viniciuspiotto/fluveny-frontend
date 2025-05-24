import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useGetModule } from '../../hooks/api/queries/use-get-module';
import { getIntroduction } from '../../services/get-introduction';
import { useModuleInfo } from '../../store/use-module-info';
import { useModuleWizard } from '../../store/use-module-wizard';

export const Module = () => {
  const [hasIntroduction, setHasIntroduction] = useState<boolean>(false);
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
  }, [moduleId, setStepModes]);

  const handleEditIntroduction = async () => {
    setStepModes('introduction', 'edit');
    setStepCompletion('introduction', true);
    navigate(`/modules/create/${moduleId}/introduction`);
  };

  const handleEditDetails = () => {
    navigate(`/modules/edit/${moduleId}`);
  };

  useEffect(() => {
    hasIntroduction
      ? setStepModes('introduction', 'edit')
      : setStepModes('introduction', 'create');
  }, [hasIntroduction, setStepModes]);

  const { data: module, isLoading, error } = useGetModule(moduleId);

  if (isLoading) return <p>Loading...</p>;
  if (error || !module?.data) return <p>Erro ao carregar módulo</p>;

  const { title } = module.data;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="flex items-center gap-4">
        Módulo: <span className="text-xl font-bold">{title}</span>
      </h1>

      <Button onClick={handleEditDetails}>Editar detalhes do módulo</Button>

      <Button onClick={handleEditIntroduction} disabled={!hasIntroduction}>
        Editar introdução do módulo
      </Button>
    </div>
  );
};
