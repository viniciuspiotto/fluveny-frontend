import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

const englishLevel = ['A1', 'A2', 'B1', 'B2', 'C1'];

export const ModuleFilter = () => {
  return (
    <form className="mb-6 flex gap-4 lg:mb-7">
      <div className="relative lg:w-140">
        <Input
          className="text-md placeholder:text-md px-4 py-5 pr-10 placeholder:text-zinc-400 lg:px-5 lg:py-6 lg:text-lg"
          placeholder="Regras gramaticais..."
        />
        <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-zinc-400 lg:size-5" />
      </div>
      <Select>
        <SelectTrigger className="w-[100px] min-w-[100px] lg:w-[120px] lg:px-4 lg:py-6 lg:text-lg">
          <SelectValue placeholder="Nível" />
        </SelectTrigger>
        <SelectContent>
          {englishLevel.map((level) => {
            return (
              <SelectItem key={level} value={level} className="lg:text-lg">
                {level}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button
        type="submit"
        className="flex h-10 items-center gap-2 rounded-md text-lg font-normal lg:px-4 lg:py-6 lg:text-lg"
      >
        <span className="hidden lg:block">Filtrar</span>
        <Search className="size-4 lg:size-5" />
      </Button>
    </form>
  );
};
