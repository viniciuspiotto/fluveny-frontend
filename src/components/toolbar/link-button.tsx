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

  if (!editor) return null;

  const handleClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!linkRef.current) return;

    let url = linkRef.current.value.trim();

    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }

    if (!/^(https?:\/\/)/i.test(url)) {
      url = `https://${url}`;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          title="Inserir Link"
          variant={editor.isActive('link') ? 'default' : 'ghost'}
          type="button"
        >
          <Link className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleClick}>
          <div className="grid gap-4 pb-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                placeholder="www.example.com"
                autoComplete="off"
                className="col-span-3 h-8"
                ref={linkRef}
                defaultValue={editor.getAttributes('link').href ?? ''}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="button">Aplicar</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
