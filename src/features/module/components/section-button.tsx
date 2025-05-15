import { Button } from '@/components/ui/button';
import { SECTIONS_CREATION_MODULE } from '@/constants/module';

interface SectionButton {
  variant: 'introduction' | 'topic' | 'finalChallenge' | 'revision';
  isCompleted?: boolean;
}

export const SectionButton = ({ variant, isCompleted }: SectionButton) => {
  const Icon = SECTIONS_CREATION_MODULE[variant].icon;

  return (
    <Button className="mx-auto my-6 bg-zinc-50 py-6">
      <Icon className="text-primary size-8" opacity={isCompleted ? 100 : 50} />
    </Button>
  );
};
