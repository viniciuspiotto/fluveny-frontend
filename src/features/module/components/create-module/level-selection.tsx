import { LevelSelect } from '@/components/level-select';
import { Label } from '@/components/ui/label';

export const LevelSelection = () => {
  return (
    <div className="mt-4 space-y-2">
      <Label htmlFor="level" className="block text-xl font-medium">
        Nível de dificuldade
      </Label>
      <LevelSelect />
    </div>
  );
};
