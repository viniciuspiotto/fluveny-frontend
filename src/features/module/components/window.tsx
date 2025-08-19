import type { WindowType } from '@/@types/module';
import { cn } from '@/app/utils/cn';
import type { Identifier, XYCoord } from 'dnd-core';
import { BowArrow, Presentation } from 'lucide-react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useGrammarRuleModuleWindows } from '../stores/use-grammar-rule-module-windows';
import { AddWindow } from './add-window';

interface WindowProps {
  id: string;
  isCurrent?: boolean;
  position: number;
  selectWindow: () => void;
  isDraft: boolean;
  type: WindowType;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DND_ITEM_TYPE = 'WINDOW';

export const Window = ({
  id,
  isCurrent = false,
  position,
  isDraft,
  type,
  selectWindow,
}: WindowProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const { moveWindow } = useGrammarRuleModuleWindows((state) => state);
  const index = position - 1;
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: DND_ITEM_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      moveWindow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DND_ITEM_TYPE,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <div
      className={cn(
        'group relative flex items-center justify-center transition-all duration-300 ease-in-out',
        isCurrent && 'mx-8 scale-110',
        !isCurrent && 'hover:mx-4',
      )}
    >
      <AddWindow side="left" insertionIndex={position - 1} />

      <li
        onClick={selectWindow}
        data-handler-id={handlerId}
        className={cn(
          'h-18 w-30 flex-shrink-0 cursor-grab rounded-md border-2 p-2 lg:h-24 lg:w-50',
          isCurrent && 'border-primary',
          isDragging && 'opacity-50',
        )}
        ref={ref}
      >
        {type === 'PRESENTATION' && (
          <Presentation
            className={`${isCurrent ? 'text-primary' : 'text-zinc-400'}`}
          />
        )}
        {type === 'EXERCISE' && (
          <BowArrow
            className={`${isCurrent ? 'text-primary' : 'text-zinc-400'}`}
          />
        )}
        {isDraft && (
          <span className="absolute top-2 right-3 text-zinc-400">*</span>
        )}
        <span className="absolute bottom-0 left-2 lg:text-lg">{position}</span>
      </li>

      <AddWindow side="right" insertionIndex={position} />
    </div>
  );
};
