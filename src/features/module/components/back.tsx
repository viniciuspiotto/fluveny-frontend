import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { ArrowLeft } from 'lucide-react';

interface BackProps {
  className?: string;
  onClick?: () => void;
}

export const Back = ({ className, onClick }: BackProps) => {
  return (
    <Button
      size={'icon'}
      onClick={onClick}
      className={clsx('cursor-pointer rounded-full p-6', className)}
      type="button"
    >
      <ArrowLeft className="size-7" />
    </Button>
  );
};
