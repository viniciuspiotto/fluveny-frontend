import { cn } from '@/app/utils/cn';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetLevels } from '@/features/module/hooks/api/queries/use-get-levels';
import { Controller, useFormContext } from 'react-hook-form';

export const LevelSelect = () => {
  const { data: response } = useGetLevels();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const levels = response?.data ?? [];

  return (
    <>
      <Controller
        name="id_level"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value ?? ''}>
            <SelectTrigger
              id="id_level"
              className={cn(
                'peer w-[110px] min-w-[100px] px-4 text-lg lg:w-[120px] lg:py-6 lg:text-lg',
                errors.id_level &&
                  'border-red-500 data-[placeholder]:text-red-500',
              )}
            >
              <SelectValue placeholder="Nível" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => {
                return (
                  <SelectItem
                    key={level.id}
                    value={level.id}
                    className="lg:text-lg"
                  >
                    {level.title}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
      />
    </>
  );
};
