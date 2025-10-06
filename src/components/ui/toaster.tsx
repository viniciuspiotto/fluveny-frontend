import { cn } from '@/app/utils/cn';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { Toaster as Sonner } from 'sonner';

const Toaster = () => {
  return (
    <Sonner
      className="toaster group"
      position="top-right"
      closeButton={true}
      duration={3000}
      icons={{
        success: <CheckCircle className="text-success size-5" />,
        warning: <AlertTriangle className="text-warning size-5" />,
        error: <AlertCircle className="text-destructive size-5" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: cn(
            'group toast',
            'relative flex w-full items-center gap-3',
            'bg-white p-4 text-zinc-900',
            'border rounded-lg shadow-md',
          ),
          title: cn('text-sm font-semibold'),
          description: cn('text-sm text-zinc-500'),
          success: cn('!text-success'),
          warning: cn('!text-warning'),
          error: cn('!text-destructive'),
          closeButton: cn(
            'absolute top-2 right-2',
            'p-1 rounded-md',
            'text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900',
            'transition-colors',
          ),
        },
      }}
    />
  );
};

export { Toaster };
