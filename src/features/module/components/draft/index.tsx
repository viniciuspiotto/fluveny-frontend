import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export const Draft = () => {
  const navigate = useNavigate();

  const handleCreateNewModule = () => {
    navigate('/modules/new');
  };

  return (
    <div className="flex h-screen items-center justify-center gap-4">
      <Button onClick={handleCreateNewModule}>Criar Módulo</Button>
    </div>
  );
};
