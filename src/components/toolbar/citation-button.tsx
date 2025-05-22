import { useCurrentEditor } from '@tiptap/react';
import { Quote } from 'lucide-react';
import { Button } from '../ui/button';

export default function CitationButton() {
  const { editor } = useCurrentEditor();

  if (!editor) return;

  const handleClick = () => {
    if (editor.isActive('blockquote')) {
      editor.chain().focus().unsetBlockquote().run();
    } else {
      editor.chain().focus().setBlockquote().run();
    }
  };

  return (
    <Button onClick={handleClick} variant="ghost">
      <Quote
        className="size-5"
        fill={editor.isActive('blockquote') ? '#000000' : '#ffffff'}
      />
    </Button>
  );
}
