import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCurrentEditor } from '@tiptap/react';
import { ImageIcon } from 'lucide-react';
import { useRef, type FormEvent } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const ImageButton = () => {
  const { editor } = useCurrentEditor();
  const imageRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  const handleAddImage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageRef.current) return;

    editor.chain().focus().setImage({ src: imageRef.current.value }).run();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button title="Inserir Imagem" variant="ghost" type="button">
          <ImageIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={(e) => handleAddImage(e)}>
          <div className="grid gap-4 pb-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                placeholder="www.example.com"
                autoComplete="off"
                className="col-span-3 h-8"
                ref={imageRef}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Inserir</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
