import { cn } from '@/app/utils/cn';
import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Controller, useFormContext } from 'react-hook-form';

export const DescriptionField = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name="description"
      render={({ field }) => (
        <AutosizeTextarea
          id="description"
          className={cn(
            'resize-none text-lg',
            errors.description && 'border-red-500',
          )}
          minHeight={200}
          maxHeight={400}
          {...field}
        />
      )}
    />
  );
};
