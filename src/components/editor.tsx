import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, EditorContext, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Toolbar } from './toolbar';

// TODO: ajustar o text rich para ao clicar em qualquer lugar da div pai, dar focus no editor
export const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Image,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
  });

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className="space-y-3">
        <Toolbar />
        <EditorContent
          editor={editor}
          className="prose prose-sm md:prose-lg prose-img:mx-auto prose-p:text-lg max-w-none rounded-md border p-4"
        />
      </div>
    </EditorContext.Provider>
  );
};
