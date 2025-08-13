import type { WindowType } from '@/@types/module';
import { cn } from '@/app/utils/cn';
import { BowArrow, Presentation } from 'lucide-react';
import { AddWindow } from './add-window';

interface WindowProps {
  isCurrent?: boolean;
  position: number;
  selectWindow: () => void;
  isDraft: boolean;
  type: WindowType;
}

export const Window = ({
  isCurrent = false,
  position,
  isDraft,
  type,
  selectWindow,
}: WindowProps) => {
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
        className={cn(
          'h-18 w-30 flex-shrink-0 cursor-grab rounded-md border-2 p-2 lg:h-24 lg:w-50',
          isCurrent && 'border-primary',
        )}
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
