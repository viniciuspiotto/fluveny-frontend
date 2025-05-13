import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { englishLevels } from '@/mocks/english-levels';

export const LevelSelect = () => {
  return (
    <Select>
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
  );
};
