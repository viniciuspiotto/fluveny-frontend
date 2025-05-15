import { Button } from '@/components/ui/button';
import { SECTIONS_CREATION_MODULE } from '@/constants/module';
import clsx from 'clsx';

interface SectionButtonProps {
  variant: 'introduction' | 'topic' | 'finalChallenge' | 'revision';
  title: string;
  isStarted: boolean;
}

export const SectionButton = ({
  variant,
  title,
  isStarted,
}: SectionButtonProps) => {
  const Icon = SECTIONS_CREATION_MODULE[variant].icon;

  return (
    <Button
      className={clsx(
        'items-center bg-zinc-50 py-6 hover:bg-zinc-50 focus:bg-zinc-50',
        {
          'opacity-50': !isStarted,
        },
      )}
    >
      <Icon className="text-primary size-8" />
      <h1 className="text-primary hidden md:block">{title}</h1>
    </Button>
  );
};
