import { useModuleWizard } from '../store/use-module-wizard';

export const useSectionStep = () => {
  const { steps, currentStep } = useModuleWizard();

  const currentIndex = steps.findIndex((step) => step === currentStep);
  const nextStep = steps[currentIndex + 1];

  return { nextStep };
};
