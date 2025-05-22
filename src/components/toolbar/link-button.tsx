import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCurrentEditor } from '@tiptap/react';
import { Link } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Button } from '../ui/button';

export default function LinkButton() {
  const { editor } = useCurrentEditor();
  const [link, setLink] = useState<string>();

  if (!editor) return;

  const handleLink = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editor.chain().focus().run();
    if (editor.isActive('link')) {
      // empty
      if (link === '' || !link) {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();

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
        <Button variant={editor.isActive('link') ? 'default' : 'ghost'}>
          <Link className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={(e) => handleLink(e)}>
          <div className="grid gap-4 pb-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                placeholder="www.example.com"
                value={link}
                autoComplete="off"
                className="col-span-3 h-8"
                onChange={(e) => {
                  setLink(e.target.value ?? '');
                }}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Apply</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
