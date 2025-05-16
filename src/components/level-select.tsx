import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { englishLevels } from '@/mocks/english-levels';
import { Controller, type Control } from 'react-hook-form';

// TODO: implementar type
type LevelSelectProps = {
  control: Control<any>;
};

export const LevelSelect = ({ control }: LevelSelectProps) => {
  return (
    <>
      <Controller
        name="level"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-[110px] min-w-[100px] px-4 text-lg lg:w-[120px] lg:py-6 lg:text-lg">
              <SelectValue placeholder="Nível" />
            </SelectTrigger>
            <SelectContent>
              {englishLevels.map((level) => {
                return (
                  <SelectItem key={level} value={level} className="lg:text-lg">
                    {level}
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
