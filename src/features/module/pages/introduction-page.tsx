import { useEffect } from 'react';
import { CreateIntroduction } from '../components/create-introduction';
import { EditIntroduction } from '../components/edit-introduction';
import { getIntroduction } from '../services/get-introduction';
import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';

export const IntroductionPage = () => {
  const { setStepModes, stepModes } = useModuleWizard();
  const { moduleId } = useModuleInfo();

  console.log(stepModes);

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

  if (stepModes['introduction'] === 'edit') return <EditIntroduction />;
  return <CreateIntroduction />;
};
