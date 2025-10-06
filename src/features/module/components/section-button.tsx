import { ROUTES } from '@/app/configs/routes';
import { cn } from '@/app/utils/cn';
import { Button } from '@/components/ui/button';
import { NotFound } from '@/templates/not-found';
import { Home, PencilRuler, Swords } from 'lucide-react';
import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

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
  const location = useLocation();

  const targetPath = useMemo(() => {
    switch (variant) {
      case 'introduction':
        return `${ROUTES.modules}/${ROUTES.create}/${moduleId}/${ROUTES.introduction}`;
      case 'grammarRule':
        return `${ROUTES.modules}/${ROUTES.create}/${moduleId}/${ROUTES.grammarRule}/${grammarRuleId}`;
      case 'finalChallenge':
        return `${ROUTES.modules}/${ROUTES.create}/${moduleId}/${ROUTES.finalChallenge}`;
      default:
        return '';
    }
  }, [variant, moduleId, grammarRuleId]);

  if (!moduleId) {
    return <NotFound />;
  }

  const isCurrentPage = location.pathname.startsWith(targetPath);

  const handleClick = () => {
    if (!isCurrentPage) {
      navigate(targetPath);
    }
  };

  return (
    <Button
      className={cn(
        'items-center bg-zinc-50 py-6 transition-all duration-300 ease-in-out',
        !isCurrentPage &&
          'cursor-pointer hover:-translate-y-1 hover:scale-105 hover:bg-zinc-50',
      )}
      onClick={handleClick}
      disabled={isCurrentPage}
    >
      {variant === 'grammarRule' ? (
        <PencilRuler className="text-primary size-8" />
      ) : variant === 'finalChallenge' ? (
        <Swords className="text-primary size-8" />
      ) : (
        <Home className="text-primary size-8" />
      )}
      <h1 className="text-primary hidden md:block">{title}</h1>
    </Button>
  );
};
