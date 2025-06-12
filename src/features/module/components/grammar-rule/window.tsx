import type { WindowType } from '@/@types/module';
import { cn } from '@/app/utils/cn';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface WindowProps {
  isCurrent?: boolean;
  position: number;
  onAddWindow: (position: number, type: WindowType) => void;
  onSetCurrent: (id: number) => void;
}

export const Window = ({
  isCurrent = false,
  position,
  onAddWindow,
  onSetCurrent,
}: WindowProps) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleAddNewWindow = (type: WindowType) => {
    setPopoverOpen(false);
    setTimeout(() => {
      onAddWindow(position, type);
    }, 50);
  };

  return (
    <>
      <li
        onClick={() => onSetCurrent(position)}
        className={cn(
          'group relative h-18 w-30 flex-shrink-0 cursor-pointer rounded-md border-1 px-1 py-2 lg:h-24 lg:w-50',
          isCurrent && 'border-primary',
        )}
      >
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
                onClick={() => handleAddNewWindow('presentation')}
                variant={'ghost'}
                className="border-primary cursor-pointer rounded-t-md rounded-b-none border-b-1 lg:py-5 lg:text-base"
              >
                Apresentação
              </Button>
              <Button
                onClick={() => handleAddNewWindow('exercise')}
                variant={'ghost'}
                className="cursor-pointer rounded-b-md bg-white text-zinc-900 lg:py-5 lg:text-base"
              >
                Exercício
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </li>
    </>
  );
};
