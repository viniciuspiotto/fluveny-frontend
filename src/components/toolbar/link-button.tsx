import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCurrentEditor } from '@tiptap/react';
import { Link } from 'lucide-react';
import { useRef, type FormEvent } from 'react';
import { Button } from '../ui/button';

export default function LinkButton() {
  const { editor } = useCurrentEditor();
  const linkRef = useRef<HTMLInputElement>(null);

  if (!editor) return;

  const handleClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editor.chain().focus().run();
    if (!linkRef.current) return;

    const link = linkRef.current.value;

    if (editor.isActive('link')) {
      // empty
      if (link === '' || !link) {
        editor.chain().focus().unsetLink().run();

        return;
      }

      // update link

      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: link })
        .run();
    } else {
      if (link) {
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: link })
          .run();
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          title="Inserir Link"
          variant={editor.isActive('link') ? 'default' : 'ghost'}
        >
          <Link className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={(e) => handleClick(e)}>
          <div className="grid gap-4 pb-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                placeholder="www.example.com"
                autoComplete="off"
                className="col-span-3 h-8"
                ref={linkRef}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Aplicar</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
