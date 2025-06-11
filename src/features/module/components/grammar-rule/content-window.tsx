import { Window } from './window';

export const ContentWindow = () => {
  return (
    <ol className="fixed bottom-0 left-0 mb-20 flex w-full items-center gap-4 overflow-x-auto bg-white px-10 py-2">
      <Window position={1} isCurrent={true} />
    </ol>
  );
};
