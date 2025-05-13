import { LevelSelect } from '@/components/level-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Search } from 'lucide-react';

export const ModuleFilter = () => {
  return (
    <form className="mb-6 flex gap-4 lg:mb-7">
      <div className="relative lg:w-140">
        <Input
          className="placeholder:text-md px-4 py-5 pr-10 text-sm placeholder:text-zinc-400 lg:px-5 lg:py-6 lg:text-lg"
          placeholder="Regras gramaticais..."
        />
        <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-zinc-400 lg:size-5" />
      </div>
      <LevelSelect />
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
