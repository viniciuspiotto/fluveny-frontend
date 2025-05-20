import { useCurrentEditor } from '@tiptap/react';
import { ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';

// TODO: melhorar a forma de colocar a url
export const ImageButton = () => {
  const { editor } = useCurrentEditor();

  if (!editor) return;

  const handleAddImage = () => {
    const url = window.prompt('Insira a URL da imagem');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <Button onClick={handleAddImage} variant="ghost">
      <ImageIcon className="size-5" />
    </Button>
  );
};
