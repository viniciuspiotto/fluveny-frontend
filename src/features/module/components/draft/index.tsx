import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export const Draft = () => {
  return (
    <div className="flex h-screen items-center justify-center gap-4">
      <Link to={'/modules/new'}>
        <Button>Criar Módulo</Button>
      </Link>
    </div>
  );
};
