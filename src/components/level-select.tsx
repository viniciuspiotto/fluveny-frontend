import { cn } from '@/app/utils/cn';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetLevels } from '@/features/module/hooks/api/queries/use-get-levels';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem } from './ui/form';

export const LevelSelect = () => {
  const { data: response } = useGetLevels();
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const levels = response?.data ?? [];

  return (
    <FormField
      name="id_level"
      control={control}
      render={({ field }) => (
        <FormItem>
          <Select {...field} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger
                id="id_level"
                className={cn(
                  'peer w-[110px] min-w-[100px] px-4 text-lg lg:w-[120px] lg:py-6 lg:text-lg',
                  errors.id_level &&
                    'animate-shake border-red-500 data-[placeholder]:text-red-500',
                )}
              >
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {levels.map((level) => (
                <SelectItem
                  key={level.id}
                  value={level.id}
                  className="lg:text-lg"
                >
                  {level.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
