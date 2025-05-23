import { useCurrentEditor } from '@tiptap/react';
import { Redo2, Undo2 } from 'lucide-react';
import { Button } from '../ui/button';

export default function HistoryButtons() {
  const { editor } = useCurrentEditor();

  if (!editor) return;

  return (
    <>
      <Button
        title="Desfazer (Ctrl + Z)"
        variant="ghost"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo2 />
      </Button>

      <Button
        title="Refazer (Ctrl + Y)"
        variant="ghost"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo2 />
      </Button>
    </>
  );
}
