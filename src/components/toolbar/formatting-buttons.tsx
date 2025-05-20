import { useCurrentEditor } from '@tiptap/react';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';
import { Button } from '../ui/button';

export const FormattingButtons = () => {
  const { editor } = useCurrentEditor();

  if (!editor) return;

  return (
    <>
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        variant={editor.isActive('bold') ? 'default' : 'ghost'}
      >
        <Bold className="size-5" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        variant={editor.isActive('italic') ? 'default' : 'ghost'}
      >
        <Italic className="size-5" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
      >
        <List className="size-5" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
      >
        <ListOrdered className="size-5" />
      </Button>
    </>
  );
};
