import { useCurrentEditor } from '@tiptap/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const BlockTypeSelect = () => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  const current = editor.isActive('heading', { level: 1 })
    ? 'h1'
    : editor.isActive('heading', { level: 2 })
      ? 'h2'
      : editor.isActive('heading', { level: 3 })
        ? 'h3'
        : 'paragraph';

  const handleChange = (value: string) => {
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = Number(value.replace('h', '')) as 1 | 2 | 3;
      editor.chain().focus().setHeading({ level }).run();
    }
  };

  return (
    <Select value={current} onValueChange={handleChange}>
      <SelectTrigger className="w-[140px] border-0">
        <SelectValue placeholder="Conteúdo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="h1">Título</SelectItem>
          <SelectItem value="h2">Subtítulo</SelectItem>
          <SelectItem value="h3">Subtítulo 2</SelectItem>
          <SelectItem value="paragraph">Conteúdo</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
