import { useLocation, useParams } from 'react-router';
import { useModuleWizard } from '../store/use-module-wizard';
import { useGetModule } from './use-get-module';

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

  const { data: response } = useGetModule(id || '1');

  const grammarRules = response?.data.grammarRules ?? [];

  const stepSlug = getStepSlug(variant, title);
  const path = `/modules/create/${id}/${stepSlug}`;
  const isCurrent = location.pathname === path;

  const allSteps = [
    'introduction',
    ...grammarRules.map((t) => t.title),
    'final-challenge',
  ];
  const currentIndex = allSteps.findIndex((step) => step === stepSlug);
  const previousStep = allSteps[currentIndex - 1];
  const isAccessible = currentIndex === 0 || !!stepCompletion[previousStep];

  return { path, isCurrent, isAccessible, stepSlug };
};
