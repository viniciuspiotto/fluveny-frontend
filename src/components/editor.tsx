import { useModuleWizard } from '@/features/module/store/use-module-wizard';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, EditorContext, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Toolbar } from './toolbar';

interface EditorProps {
  initialContent: string;
}

export const Editor = ({ initialContent }: EditorProps) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const { setValue, register } = useFormContext();

  const { currentStep, setStepCompletion } = useModuleWizard();

  useEffect(() => {
    register('textBlock');
  }, [register]);

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
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      setIsEmpty(editor.isEmpty);
      setValue('textBlock', html, { shouldDirty: true });
    },
  });

  useEffect(() => {
    if (editor && currentStep) {
      setStepCompletion(currentStep, !isEmpty);
    }
  }, [editor, isEmpty, currentStep, setStepCompletion]);

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
