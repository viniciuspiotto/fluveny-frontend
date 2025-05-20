import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCurrentEditor } from '@tiptap/react';
import clsx from 'clsx';

interface SolidColorPickerProps {
  className?: string;
}

const colors = [
  '#4B5563', // Gray
  '#64748B', // Slate
  '#F43F5E', // Rose
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#0EA5E9', // Sky
  '#6366F1', // Indigo
  '#8B5CF6', // Violet
];

export const SolidColorPicker = ({ className }: SolidColorPickerProps) => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  const currentColor = editor.getAttributes('textStyle').color || '#000000';

  const handleColorChange = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={clsx('h-6 w-6 cursor-pointer rounded border', className)}
          style={{ background: currentColor }}
        />
      </PopoverTrigger>

      <PopoverContent className="w-auto p-2">
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <div
              key={color}
              style={{ background: color }}
              className={clsx(
                'h-6 w-6 cursor-pointer rounded border transition-transform hover:scale-110',
                {
                  'ring-2 ring-black ring-offset-2': currentColor === color,
                },
              )}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
