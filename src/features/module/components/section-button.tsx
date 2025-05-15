import { Button } from '@/components/ui/button';
import { SECTIONS_CREATION_MODULE } from '@/constants/module';

interface SectionButton {
  variant: 'introduction' | 'topic' | 'finalChallenge' | 'revision';
  isStarted?: boolean;
  title: string;
}

export const SectionButton = ({ variant, isStarted, title }: SectionButton) => {
  const Icon = SECTIONS_CREATION_MODULE[variant].icon;

  let btnClasses =
    'my-6 ml-6 bg-zinc-50 py-6 focus:bg-zinc-50 hover:bg-zinc-50';

  if (variant === 'revision') {
    btnClasses += ' mr-6';
  }

  if (!isStarted) {
    btnClasses += ' md:opacity-50';
  }

  return (
    <Button className={btnClasses}>
      <Icon className="text-primary size-8" opacity={isStarted ? 1 : 0.5} />
      <h1 className="text-primary not-md:hidden">{title}</h1>
    </Button>
  );
};
