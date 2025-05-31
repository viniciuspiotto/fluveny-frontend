import { useCurrentEditor } from '@tiptap/react';

import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '../ui/select';

export const TextAlignSelect = () => {
  const { editor } = useCurrentEditor();

  if (!editor) return;

  const current = (() => {
    if (editor.isActive({ textAlign: 'left' })) return 'left';
    if (editor.isActive({ textAlign: 'center' })) return 'center';
    if (editor.isActive({ textAlign: 'right' })) return 'right';
    if (editor.isActive({ textAlign: 'justify' })) return 'justify';
    return 'left';
  })();

  return (
    <Select
      value={current}
      onValueChange={(value: string) =>
        editor.chain().focus().setTextAlign(value).run()
      }
    >
      <SelectTrigger className="w-[80px] border-0">
        {{
          left: <AlignLeft className="size-6 text-zinc-800" />,
          center: <AlignCenter className="size-6 text-zinc-800" />,
          right: <AlignRight className="size-6 text-zinc-800" />,
          justify: <AlignJustify className="size-6 text-zinc-800" />,
        }[current] ?? <AlignLeft className="size-6 text-zinc-800" />}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="left" className="flex justify-center">
            <AlignLeft className="size-6 text-zinc-800" />
          </SelectItem>
          <SelectItem value="center" className="flex justify-center">
            <AlignCenter className="size-6 text-zinc-800" />
          </SelectItem>
          <SelectItem value="right" className="flex justify-center">
            <AlignRight className="size-6 text-zinc-800" />
          </SelectItem>
          <SelectItem value="justify" className="flex justify-center">
            <AlignJustify className="size-6 text-zinc-800" />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
