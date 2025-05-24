import { useModuleInfo } from '../store/use-module-info';
import { useModuleWizard } from '../store/use-module-wizard';

export const useSectionStep = (slug: string) => {
  const { stepCompletion, steps, currentStep } = useModuleWizard();

  const { moduleId } = useModuleInfo();

  const currentIndex = steps.findIndex((step) => step === slug);
  const previousStep = steps[currentIndex - 1];
  const isAccessible = currentIndex === 0 || !!stepCompletion[previousStep];

  const isCurrent = slug === currentStep;

  const prevPath =
    currentIndex === 0
      ? `/modules/drafts`
      : `/modules/create/${moduleId}/${previousStep}`;
  const nextPath = `/modules/create/${moduleId}/${slug}`;

  return { prevPath, nextPath, isAccessible, isCurrent };
};
