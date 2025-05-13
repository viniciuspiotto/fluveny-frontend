import { AutosizeTextarea } from '@/components/ui/autosize-textarea';
import { Label } from '@/components/ui/label';

export const DescriptionSection = () => {
  return (
    <div className="mt-4 space-y-2">
      <Label htmlFor="description" className="block text-xl font-medium">
        Descrição
      </Label>
      <AutosizeTextarea
        className="resize-none text-lg"
        minHeight={200}
        maxHeight={400}
      />
    </div>
  );
};
