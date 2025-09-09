import { cn } from '@/app/utils/cn';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { Toaster as Sonner } from 'sonner';

const Toaster = () => {
  return (
    <Sonner
      className={cn('group', 'toaster', '[--width:auto]', '[--padding:1rem]')}
      position="top-right"
      closeButton={false}
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
            'flex items-center gap-4',
            'bg-white py-3 px-5 text-zinc-500',
            'border-2 rounded shadow-lg',
          ),
          title: cn('text-base font-medium'),
          description: cn('text-sm'),
          success: cn('!text-success'),
          warning: cn('!text-warning'),
          error: cn('!text-destructive'),
        },
      }}
    />
  );
};

export { Toaster };
