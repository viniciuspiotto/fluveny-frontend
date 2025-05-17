import { capitalizeWords } from '@/app/utils/capitalize-words';
import { Button } from '@/components/ui/button';
import { SECTIONS_CREATION_MODULE } from '@/constants/module';
import clsx from 'clsx';
import { useSectionStep } from '../hooks/use-section-step';
import { useModuleWizard } from '../store/use-module-wizard';
import { useNavigationModal } from '../store/use-navigation-modal';

interface SectionButtonProps {
  variant: 'introduction' | 'topic' | 'finalChallenge' | 'revision';
  title: string;
  slug: string;
}

export const SectionButton = ({ variant, title, slug }: SectionButtonProps) => {
  const { path, isAccessible, isCurrent } = useSectionStep(slug);
  const { openModal } = useNavigationModal();

  const { nextStep } = useModuleWizard();

  const Icon = SECTIONS_CREATION_MODULE[variant].icon;

  const handleClick = () => {
    nextStep();
    if (isCurrent) openModal(path);
  };

  return (
    <Button
      disabled={!isAccessible}
      className={clsx(
        'items-center bg-zinc-50 py-6 hover:bg-zinc-50 focus:bg-zinc-50',
        {
          'opacity-50': !isAccessible,
        },
      )}
      onClick={handleClick}
    >
      <Icon className="text-primary size-8" />
      <h1 className="text-primary hidden md:block">{capitalizeWords(title)}</h1>
    </Button>
  );
};
