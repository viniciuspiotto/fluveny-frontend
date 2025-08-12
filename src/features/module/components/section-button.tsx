import { Button } from '@/components/ui/button';
import { Home, PencilRuler } from 'lucide-react';

interface SectionButtonProps {
  variant: 'introduction' | 'grammarRule' | 'finalChallenge' | 'revision';
  title: string;
}

export const SectionButton = ({ variant, title }: SectionButtonProps) => {
  const handleClick = () => {
    // TODO: ir para a proxima grammarRuleModule
  };

  return (
    <Button
      className="cursor-pointer items-center bg-zinc-50 py-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-zinc-50"
      onClick={handleClick}
    >
      {variant === 'grammarRule' ? (
        <PencilRuler className="text-primary size-8" />
      ) : (
        <Home className="text-primary size-8" />
      )}
      <h1 className="text-primary hidden md:block">{title}</h1>
    </Button>
  );
};
