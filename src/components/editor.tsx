import { cn } from '@/app/utils/cn';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, EditorContext, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import { useFormContext, type FieldError } from 'react-hook-form';
import { Toolbar } from './toolbar';

interface EditorProps {
  registerCamp: string;
  initialContent?: string;
  error: FieldError | undefined;
}

// todo: resolve render problem
export const Editor = ({
  registerCamp,
  initialContent,
  error,
}: EditorProps) => {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    register(registerCamp);
  }, [register, registerCamp]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        autolink: true,
        openOnClick: false,
      }),
    ],
    content: initialContent || '',
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
    onBlur({ editor }) {
      const html = editor.getHTML();
      if (html === '<p></p>') {
        setValue(registerCamp, '', {
          shouldValidate: true,
          shouldDirty: true,
        });
      } else {
        setValue(registerCamp, html, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    },
  });

  return (
    <EditorContext.Provider value={{ editor }}>
      <div className="space-y-3">
        <Toolbar />
        <EditorContent
          editor={editor}
          className={cn(
            'prose prose-sm md:prose-lg prose-img:mx-auto prose-p:text-lg min-h-50 max-w-none rounded-md border p-4 lg:min-h-100',
            error && 'animate-shake border-red-500 text-red-500',
          )}
        />
        {error && (
          <p className="flex text-center text-sm text-red-500">
            {error.message}
          </p>
        )}
      </div>
    </EditorContext.Provider>
  );
};
