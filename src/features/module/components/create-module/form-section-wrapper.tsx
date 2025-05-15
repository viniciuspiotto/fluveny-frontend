import { Label } from '@/components/ui/label';
import type { ReactNode } from 'react';

type Props = {
  label: string;
  htmlFor?: string;
  children: ReactNode;
};

export const FormSectionWrapper = ({ label, htmlFor, children }: Props) => (
  <div className="mt-4 space-y-2">
    <Label htmlFor={htmlFor} className="block text-xl font-medium">
      {label}
    </Label>
    {children}
  </div>
);
