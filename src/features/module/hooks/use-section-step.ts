import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';

export const useSectionStep = (slug: string) => {
  const { stepCompletion, steps, currentStep } = useModuleWizard();

  const { moduleId } = useModuleInfo();

  const path = `/modules/create/${moduleId}/${slug}`;

  const currentIndex = steps.findIndex((step) => step === slug);
  const previousStep = steps[currentIndex - 1];
  const isAccessible = currentIndex === 0 || !!stepCompletion[previousStep];

  const isCurrent = slug === currentStep;

  return { path, isAccessible, isCurrent };
};
