import { processPhrase } from '@/app/utils/phrase-process';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DraggablePhraseItem } from '@/features/module/components/fill-in-the-blank-items';
import { Plus } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { PhraseElement } from '../schemas/fill-in-the-blanks-schema';
import { GapModal } from './gap-modal';

interface FillInTheBlankEditorProps {
  value: PhraseElement[];
  onChange: (newValue: PhraseElement[]) => void;
}

export const FillInTheBlankEditor = ({
  value,
  onChange,
}: FillInTheBlankEditorProps) => {
  const [editingGap, setEditingGap] = useState<{
    open: boolean;
    id: string | null;
    data: { words: string[]; justification: string };
  }>({
    open: false,
    id: null,
    data: { words: [], justification: '' },
  });

  const handleAddGap = () => {
    setEditingGap({
      open: true,
      id: null,
      data: { words: [], justification: '' },
    });
  };

  const handleOpenGapModal = (id: string) => {
    const gapToEdit = value.find(
      (item) => item.id === id && item.type === 'GAP',
    ) as Extract<PhraseElement, { type: 'GAP' }> | undefined;

    if (gapToEdit) {
      setEditingGap({
        open: true,
        id: id,
        data: {
          words: gapToEdit.words,
          justification: gapToEdit.justification,
        },
      });
    }
  };

  const handleCloseGapModal = () => {
    setEditingGap({
      open: false,
      id: null,
      data: { words: [], justification: '' },
    });
  };

  const handleSaveGap = (newData: {
    words: string[];
    justification: string;
  }) => {
    if (editingGap.id) {
      const newPhrase = value.map((item) =>
        item.id === editingGap.id ? { ...item, ...newData } : item,
      );
      onChange(newPhrase);
    } else {
      const newGap: PhraseElement = {
        id: crypto.randomUUID(),
        type: 'GAP',
        words: newData.words,
        justification: newData.justification,
      };

      const newPhrase = [...value, newGap];
      onChange(processPhrase(newPhrase));
    }
  };

  const handleDeleteGap = () => {
    if (!editingGap.id) return;

    const filtered = value.filter((item) => item.id !== editingGap.id);
    onChange(processPhrase(filtered));
    handleCloseGapModal();
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const newPhrase = value.map((item) =>
      item.id === id && item.type === 'TEXT'
        ? { ...item, content: e.target.value }
        : item,
    );
    onChange(newPhrase);
  };

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const reorderedPhrase = [...value];
      const [draggedItem] = reorderedPhrase.splice(dragIndex, 1);
      reorderedPhrase.splice(hoverIndex, 0, draggedItem);

      onChange(processPhrase(reorderedPhrase));
    },
    [onChange, value],
  );

  const handleTextBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    id: string,
  ) => {
    const newPhrase = value.map((item) =>
      item.id === id && item.type === 'TEXT'
        ? { ...item, content: e.target.value.trim() }
        : item,
    );
    onChange(newPhrase);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mt-7">
        <div className="mb-4 flex items-center justify-between">
          <Label className="block text-xl font-medium">Frase</Label>
          <Button
            className="group rounded-full border bg-transparent py-5"
            type="button"
            onClick={handleAddGap}
          >
            <Plus className="text-primary size-5 group-hover:text-white" />
          </Button>
        </div>

        <div className="flex min-h-[100px] flex-wrap items-center gap-1 rounded-md border bg-gray-50 p-4">
          {value.map((item, index) =>
            item.type === 'TEXT' ? (
              <DraggablePhraseItem
                key={item.id}
                item={item}
                index={index}
                moveItem={moveItem}
                handleTextChange={handleTextChange}
                handleTextBlur={handleTextBlur}
              />
            ) : (
              <button
                type="button"
                key={item.id}
                onClick={() => handleOpenGapModal(item.id)}
                className="cursor-pointer rounded-lg transition-all hover:scale-105"
              >
                <DraggablePhraseItem
                  item={item}
                  index={index}
                  moveItem={moveItem}
                  handleTextChange={handleTextChange}
                  handleTextBlur={handleTextBlur}
                />
              </button>
            ),
          )}
        </div>
      </div>
      <GapModal
        isOpen={editingGap.open}
        onClose={handleCloseGapModal}
        onSave={handleSaveGap}
        onDelete={editingGap.id ? handleDeleteGap : undefined}
        initialData={editingGap.data}
      />
    </DndProvider>
  );
};
