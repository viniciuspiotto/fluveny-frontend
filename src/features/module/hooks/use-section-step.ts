import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';

export const useSectionStep = (slug: string) => {
  const { stepCompletion, steps, currentStep } = useModuleWizard();

  const { moduleId } = useModuleInfo();

  const isCurrent = slug === currentStep;
  const currentIndex = steps.findIndex((step) => step === slug);
  const previousStep = steps[currentIndex - 1];
  const isAccessible =
    stepCompletion[slug] || stepCompletion[previousStep] || isCurrent;

  const path = `/modules/create/${moduleId}/${slug}`;

  return { path, isAccessible, isCurrent };
};
