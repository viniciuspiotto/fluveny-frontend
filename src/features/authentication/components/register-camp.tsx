import { cn } from '@/app/utils/cn';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

type RegisterCampProps = {
  label: string;
  descriptions?: string[];
  field: string;
  hasError: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const RegisterCamp = ({
  label,
  descriptions = [],
  field,
  hasError,
  ...props
}: RegisterCampProps) => {
  const { register } = useFormContext();
  return (
    <div>
      <Label className="text-md mb-2">
        {label} <span className="text-zinc-400">*</span>
      </Label>
      <Input
        {...props}
        className={cn('py-6', { 'animate-shake border-red-500': hasError })}
        {...register(field)}
      />
    </div>
  );
};
