import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type RegisterCampProps = {
  label: string;
  descriptions?: string[];
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const RegisterCamp = ({
  label,
  descriptions = [],
  ...props
}: RegisterCampProps) => {
  return (
    <div>
      <Label className="text-md mb-2">
        {label} <span className="text-zinc-400">*</span>
      </Label>
      <Input {...props} className="py-6" />
    </div>
  );
};
