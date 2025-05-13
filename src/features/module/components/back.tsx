import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const Back = () => {
  return (
    <Button
      size={'icon'}
      className="absolute -bottom-6 left-4 z-10 cursor-pointer rounded-full p-6"
    >
      <ArrowLeft className="size-7" />
    </Button>
  );
};
