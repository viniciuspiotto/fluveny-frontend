import { ROUTES } from '@/app/configs/routes';
import { Button } from '@/components/ui/button';
import { NotFound } from '@/templates/not-found';
import { Home, PencilRuler } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

interface SectionButtonProps {
  variant: 'introduction' | 'grammarRule' | 'finalChallenge' | 'revision';
  title: string;
  grammarRuleId?: string;
}

export const SectionButton = ({
  variant,
  title,
  grammarRuleId,
}: SectionButtonProps) => {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  if (!moduleId) {
    return <NotFound />;
  }

  const handleClick = () => {
    switch (variant) {
      case 'introduction': {
        navigate(
          `${ROUTES.modules}/${ROUTES.create}/${moduleId}/${ROUTES.introduction}`,
        );
        break;
      }
      case 'grammarRule': {
        navigate(
          `${ROUTES.modules}/${ROUTES.create}/${moduleId}/${ROUTES.grammarRule}/${grammarRuleId}`,
        );
        break;
      }
    }
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
