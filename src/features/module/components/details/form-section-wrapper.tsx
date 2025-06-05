import { cn } from '@/app/utils/cn';
import { Label } from '@/components/ui/label';
import type { ReactNode } from 'react';

type Props = {
  label: ReactNode;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
};

export const FormSectionWrapper = ({
  label,
  htmlFor,
  children,
  className,
}: Props) => (
  <div className={cn('mt-4 space-y-2', className)}>
    <Label htmlFor={htmlFor} className="block text-xl font-medium">
      {label}
    </Label>
    {children}
  </div>
);
