import { useWindowInfo } from '../../store/use-window-info';
import { Window } from './window';

export const ContentWindow = () => {
  const { addWindow, setCurrent, windows } = useWindowInfo();

  return (
    <ol className="fixed bottom-0 left-0 mb-20 flex w-full items-center gap-4 overflow-x-auto bg-white px-4 py-2 lg:px-10">
      {windows.map((window) => (
        <Window
          key={window.id}
          position={window.position}
          isCurrent={window.isCurrent}
          onAddWindow={addWindow}
          onSetCurrent={setCurrent}
        />
      ))}
    </ol>
  );
};
