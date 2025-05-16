import { Button } from '@/components/ui/button';
import { SECTIONS_CREATION_MODULE } from '@/constants/module';
import { modulesMock } from '@/mocks/modules';
import clsx from 'clsx';
import { useParams } from 'react-router';
import { useModuleWizard } from '../store/useModuleWizard';
import { useNavigationModal } from '../store/useNavigationModal';

interface SectionButtonProps {
  variant: 'introduction' | 'topic' | 'finalChallenge' | 'revision';
  title: string;
  isStarted?: boolean;
}

export const SectionButton = ({ variant, title }: SectionButtonProps) => {
  const { id } = useParams();
  const { stepCompletion } = useModuleWizard();
  const { openModal } = useNavigationModal();

  const moduleTopics = modulesMock.flatMap((m) => m.topics);

  const stepSlug =
    variant === 'introduction'
      ? 'introduction'
      : variant === 'finalChallenge'
        ? 'final-challenge'
        : variant === 'revision'
          ? 'revision'
          : title.toLowerCase().replace(/\s/g, '-');

  const path = `/modules/create/${id}/${stepSlug}`;
  const isCurrent = location.pathname === path;

  const allSteps = [
    'introduction',
    ...moduleTopics.map((t) => t.slug),
    'final-challenge',
  ];
  const currentIndex = allSteps.findIndex((step) => step === stepSlug);
  const previousStep = allSteps[currentIndex - 1];

  const isEnabled = currentIndex === 0 || !!stepCompletion[previousStep];

  const Icon = SECTIONS_CREATION_MODULE[variant].icon;

  const handleClick = () => {
    if (!isCurrent) openModal(path);
  };

  const isFirstStep = currentIndex === 0;
  const isAccessible =
    isFirstStep || !!stepCompletion[previousStep] || isCurrent;

  return (
    <Button
      disabled={!isEnabled}
      className={clsx(
        'items-center bg-zinc-50 py-6 hover:bg-zinc-50 focus:bg-zinc-50',
        {
          'opacity-50': !isAccessible,
          'cursor-default': isCurrent,
        },
      )}
      onClick={handleClick}
    >
      <Icon className="text-primary size-8" />
      <h1 className="text-primary hidden md:block">{title}</h1>
    </Button>
  );
};
