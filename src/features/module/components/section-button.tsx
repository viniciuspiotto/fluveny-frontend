import { Button } from '@/components/ui/button';

interface SectionButton {
  variant: 'introduction' | 'topic' | 'final-challenger' | 'revision';
}

export const SectionButton = () => {
  return (
    <Button className="bg-zinc-50 px-10 py-8">
      <Icon className="text-primary size-8" />
    </Button>
  );
};
