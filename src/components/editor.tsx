import { useModuleWizard } from '@/features/module/store/use-module-wizard';
import Blockquote from '@tiptap/extension-blockquote';
import Color from '@tiptap/extension-color';
import Gapcursor from '@tiptap/extension-gapcursor';
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
      Blockquote,
      Gapcursor,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto'];
            const protocol = parsedUrl.protocol.replace(':', '');

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === 'string' ? p : p.scheme,
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              'example-no-autolink.com',
              'another-no-autolink.com',
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
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
