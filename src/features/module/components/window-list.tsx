import type { Exercise } from '../stores/use-final-challenge-exercises';
import type { WindowsType } from '../stores/use-grammar-rule-module-windows';
import { Window } from './window';

type WindowListProps = {
  windows: WindowsType[] | Exercise[];
  currentPosition: number | null;
  onSelectWindow: (index: number) => void;
  isPresentationEnabled: boolean;
  moveWindow: (dragIndex: number, hoverIndex: number) => void;
};

export const WindowList = ({
  windows,
  currentPosition,
  onSelectWindow,
  isPresentationEnabled,
  moveWindow,
}: WindowListProps) => {
  return (
    <ol className="custom-scrollbar fixed bottom-0 left-0 mb-20 flex w-full items-center gap-4 overflow-x-auto bg-white px-4 py-8 lg:px-10">
      {windows.map((w, i) => (
        <Window
          isPresentationEnabled={isPresentationEnabled}
          id={w.id ?? w.clientId}
          position={i + 1}
          key={w.id || w.clientId}
          isCurrent={(currentPosition ?? -1) === i}
          selectWindow={() => onSelectWindow(i)}
          isDraft={!w.id}
          type={w.type}
          moveWindow={moveWindow}
        />
      ))}
    </ol>
  );
};
