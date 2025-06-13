import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const Exercise = () => {
  // Sei que esse mt-[-2rem] é um crime, mas não vi outra escolha
  return (
    <div className="mt-[-2rem] mb-18">
      <Label className="my-4 text-xl">Cabeçalho</Label>
      <Textarea className="p-8" />
      <Label className="my-4 text-xl">Frase</Label>
      <Textarea className="p-8" />
      <Label className="my-4 text-xl">Gabarito</Label>
      <Textarea className="p-8" />
    </div>
  );
};
