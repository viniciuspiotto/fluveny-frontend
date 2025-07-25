import type { Mode, WindowType } from '@/@types/module';
import { cn } from '@/app/utils/cn';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { Identifier, XYCoord } from 'dnd-core';
import { BowArrow, Plus, Presentation } from 'lucide-react';
import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useModuleWizard } from '../../store/use-module-wizard';
import ExerciseSelector from './exercise-selection';

const DND_ITEM_TYPE = 'WINDOW';

interface WindowProps {
  id: any;
  index: number;
  isCurrent?: boolean;
  position: number;
  type: WindowType;
  mode: Mode;
  onAddWindow: (
    grammarRuleModuleId: string,
    afterPosition: number,
    type: WindowType,
  ) => void;
  onSetCurrentWindow: (grammarRuleModuleId: string, positionId: number) => void;
  moveWindow: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const Window = ({
  id,
  index,
  isCurrent = false,
  position,
  type,
  mode,
  onAddWindow,
  onSetCurrentWindow,
  moveWindow,
}: WindowProps) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const { currentStep } = useModuleWizard();
  const ref = useRef<HTMLLIElement>(null);

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

  const handleAddNewWindow = (type: WindowType) => {
    setPopoverOpen(false);
    setTimeout(() => {
      onAddWindow(currentStep, position, type);
    }, 50);
  };

  return (
    <li
      ref={ref}
      data-handler-id={handlerId}
      onClick={() => onSetCurrentWindow(currentStep, position)}
      className={cn(
        'group relative h-18 w-30 flex-shrink-0 cursor-grab rounded-md border-1 p-2 lg:h-24 lg:w-50',
        isCurrent && 'border-primary',
        isDragging && 'opacity-50',
      )}
    >
      {type === 'PRESENTATION' && <Presentation className="text-primary" />}
      {type === 'EXERCISE' && <BowArrow className="text-primary" />}
      {mode === 'CREATE' && (
        <span className="absolute top-2 right-3 block text-2xl text-zinc-400">
          *
        </span>
      )}
      <span className="absolute bottom-0 left-2 lg:text-lg">{position}</span>
      <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button className="absolute top-1/2 -right-3 hidden size-6 -translate-y-1/2 cursor-pointer rounded-full p-1 group-hover:flex hover:bg-blue-800 data-[state=open]:flex data-[state=open]:bg-blue-800 lg:size-8">
            <Plus className="relative" />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" asChild className="w-40 p-0 lg:w-50">
          <div className="border-primary flex flex-col rounded-md border-1">
            <Button
              onClick={() => handleAddNewWindow('PRESENTATION')}
              variant={'ghost'}
              className="border-primary cursor-pointer rounded-t-md rounded-b-none border-b-1 lg:py-5 lg:text-base"
            >
              Apresentação
            </Button>
            <ExerciseSelector handleAddNewWindow={handleAddNewWindow}>
              <Button
                variant={'ghost'}
                className="cursor-pointer rounded-b-md bg-white text-zinc-900 lg:py-5 lg:text-base"
              >
                Exercício
              </Button>
            </ExerciseSelector>
          </div>
        </PopoverContent>
      </Popover>
    </li>
  );
};
