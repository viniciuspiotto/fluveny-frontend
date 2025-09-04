import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface PasswordInputProps {
  label: string;
  descriptions?: string[];
  field: string;
  hasError: boolean;
}

export const PasswordInput = ({
  label,
  descriptions = [],
  field,
  hasError,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, formState } = useFormContext();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="relative">
        <Label className="text-md mb-2">
          {label} <span className="text-zinc-400">*</span>
        </Label>
        <div className="relative">
          <Input
            {...register(field)}
            type={showPassword ? 'text' : 'password'}
            className="py-6"
          />
          <Button
            type="button"
            variant={'ghost'}
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-zinc-400 transition-colors hover:bg-transparent hover:text-zinc-600"
          >
            {showPassword ? (
              <EyeOff className="size-6" />
            ) : (
              <Eye className="size-6" />
            )}
          </Button>
        </div>
      </div>
      {hasError
        ? formState.errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {formState.errors.password.message as string}
            </p>
          )
        : descriptions.length !== 0 && (
            <ul className="mt-2 text-sm text-zinc-500">
              {descriptions.map((description, index) => (
                <li key={index}>{description}</li>
              ))}
            </ul>
          )}
    </div>
  );
};
