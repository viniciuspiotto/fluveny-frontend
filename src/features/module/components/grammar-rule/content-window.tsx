import { useState } from 'react';
import { Window } from './window';

interface WindowState {
  id: string;
  position: number;
  isCurrent: boolean;
  type: 'apresentation' | 'exercise';
}

export const ContentWindow = () => {
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: crypto.randomUUID(),
      position: 1,
      isCurrent: true,
      type: 'apresentation',
    },
  ]);

  const handleAddWindow = (
    afterPosition: number,
    type: 'exercise' | 'apresentation',
  ) => {
    setWindows((currentWindows) => {
      const insertionIndex = afterPosition;

      const newWindow: WindowState = {
        id: crypto.randomUUID(),
        position: 0,
        isCurrent: true,
        type: type,
      };

      const updatedWindows = [
        ...currentWindows.slice(0, insertionIndex),
        newWindow,
        ...currentWindows.slice(insertionIndex),
      ];

      const finalWindows = updatedWindows.map((window, index) => ({
        ...window,
        position: index + 1,
        isCurrent: window.id === newWindow.id,
      }));

      return finalWindows;
    });
  };

  const handleSetCurrent = (positionId: number) => {
    setWindows((currentWindows) =>
      currentWindows.map((w) => ({
        ...w,
        isCurrent: w.position === positionId,
      })),
    );
  };

  return (
    <ol className="fixed bottom-0 left-0 mb-20 flex w-full items-center gap-4 overflow-x-auto bg-white px-4 py-2 lg:px-10">
      {windows.map((window) => (
        <Window
          key={window.id}
          position={window.position}
          isCurrent={window.isCurrent}
          onAddWindow={handleAddWindow}
          onSetCurrent={handleSetCurrent}
        />
      ))}
    </ol>
  );
};
