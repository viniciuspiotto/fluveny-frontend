import { cn } from '@/app/utils/cn';

interface TagProps {
  name: string;
  variant?: 'blue' | 'white';
  className?: string;
}

export const Tag = ({ name, variant = 'white', className }: TagProps) => {
  return (
    <li
      className={cn(
        'flex rounded-lg px-4 py-1 text-sm lg:px-3 lg:py-2 lg:text-base',
        {
          'bg-primary text-white': variant === 'blue',
          'text-foreground bg-white': variant === 'white',
        },
        className,
      )}
    >
      {name}
    </li>
  );
};
