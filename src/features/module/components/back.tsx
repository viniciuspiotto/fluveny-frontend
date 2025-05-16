import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { ArrowLeft } from 'lucide-react';

interface BackProps {
  className?: string;
}

export const Back = ({ className }: BackProps) => {
  return (
    <Button
      size={'icon'}
      className={clsx('cursor-pointer rounded-full p-6', className)}
    >
      <ArrowLeft className="size-7" />
    </Button>
  );
};
