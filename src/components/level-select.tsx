import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetLevels } from '@/features/module/hooks/use-get-levels';
import type { CreateInformationModuleData } from '@/features/module/schemas/module-information-schema';
import { Controller, type Control } from 'react-hook-form';

type LevelSelectProps = {
  control: Control<CreateInformationModuleData>;
};

export const LevelSelect = ({ control }: LevelSelectProps) => {
  const { data: response } = useGetLevels();

  const levels = response?.data ?? [];

  return (
    <>
      <Controller
        name="id_level"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value ?? ''}>
            <SelectTrigger className="w-[110px] min-w-[100px] px-4 text-lg lg:w-[120px] lg:py-6 lg:text-lg">
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
