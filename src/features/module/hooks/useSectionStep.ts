import { modulesMock } from '@/mocks/modules';
import { useLocation, useParams } from 'react-router';
import { useModuleWizard } from '../store/useModuleWizard';

const moduleTopics = modulesMock.flatMap((m) => m.topics);

export const getStepSlug = (
  variant: 'introduction' | 'topic' | 'finalChallenge' | 'revision',
  title: string,
) => {
  if (variant === 'introduction') return 'introduction';
  if (variant === 'finalChallenge') return 'final-challenge';
  if (variant === 'revision') return 'revision';
  return title.toLowerCase().replace(/\s/g, '-');
};

export const useSectionStep = (
  variant: 'introduction' | 'topic' | 'finalChallenge' | 'revision',
  title: string,
) => {
  const { id } = useParams();
  const location = useLocation();
  const { stepCompletion } = useModuleWizard();

  const stepSlug = getStepSlug(variant, title);
  const path = `/modules/create/${id}/${stepSlug}`;
  const isCurrent = location.pathname === path;

  const allSteps = [
    'introduction',
    ...moduleTopics.map((t) => t.slug),
    'final-challenge',
  ];
  const currentIndex = allSteps.findIndex((step) => step === stepSlug);
  const previousStep = allSteps[currentIndex - 1];
  const isAccessible = currentIndex === 0 || !!stepCompletion[previousStep];

  return { path, isCurrent, isAccessible, stepSlug };
};
