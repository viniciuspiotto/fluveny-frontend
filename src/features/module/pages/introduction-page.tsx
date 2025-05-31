import { Introduction } from '../components/introduction';
import { useModuleWizard } from '../store/use-module-wizard';

export const IntroductionPage = () => {
  const { stepModes } = useModuleWizard();

  const mode = stepModes['introduction'];

  return <Introduction mode={mode} />;
};
