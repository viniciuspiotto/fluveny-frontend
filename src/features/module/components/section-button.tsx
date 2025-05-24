import { capitalizeWords } from '@/app/utils/capitalize-words';
import { Button } from '@/components/ui/button';
import { SECTIONS_CREATION_MODULE } from '@/constants/module';
import clsx from 'clsx';
import { useSectionStep } from '../hooks/use-section-step';
import { useConfirmModal } from '../store/use-confirm-modal';

interface SectionButtonProps {
  variant: 'introduction' | 'grammarRule' | 'finalChallenge' | 'revision';
  title: string;
  slug: string;
}

export const SectionButton = ({ variant, title, slug }: SectionButtonProps) => {
  const { path, isAccessible, isCurrent } = useSectionStep(slug);
  const { openModal } = useConfirmModal();

  const Icon = SECTIONS_CREATION_MODULE[variant].icon;

  const handleClick = () => {
    if (!isCurrent && isAccessible) {
      openModal(path, slug);
    }
  };

  return (
    <Button
      disabled={!isAccessible}
      className={clsx(
        'cursor-pointer items-center bg-zinc-50 py-6 hover:bg-zinc-50 focus:bg-zinc-50',
        {
          'cursor-auto opacity-50': !isAccessible,
          'cursor-auto': isCurrent,
        },
      )}
      onClick={handleClick}
    >
      <Icon className="text-primary size-8" />
      <h1 className="text-primary hidden md:block">{capitalizeWords(title)}</h1>
    </Button>
  );
};
