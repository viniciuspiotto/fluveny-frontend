import { useEffect } from 'react';
import { Module } from '../components/show';
import { getIntroduction } from '../services/get-introduction';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';

export const ModulePage = () => {
  const { setStepModes } = useModuleWizard();
  const { moduleId } = useModuleInfo();

  useEffect(() => {
    const checkIntroduction = async () => {
      if (!moduleId) {
        setStepModes('introduction', 'create');
        return;
      }
      try {
        const response = await getIntroduction(moduleId);
        const mode = response?.data ? 'edit' : 'create';
        setStepModes('introduction', mode);
      } catch (error) {
        console.error('Erro ao verificar introdução:', error);
        setStepModes('introduction', 'create');
      }
    };

    checkIntroduction();
  }, [moduleId, setStepModes]);

  return <Module />;
};
