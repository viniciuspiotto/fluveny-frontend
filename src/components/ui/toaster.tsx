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
        success: <CheckCircle className="size-5 text-green-500" />,
        warning: <AlertTriangle className="size-5 text-yellow-500" />,
        error: <AlertCircle className="size-5 text-red-500" />,
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
          success: cn('!text-green-500'),
          warning: cn('!text-yellow-500'),
          error: cn('!text-red-500'),
        },
      }}
    />
  );
};

export { Toaster };
