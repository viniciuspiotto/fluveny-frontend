import { Window } from './window';

export const ContentWindow = () => {
  return (
    <ol className="fixed bottom-0 left-0 mb-20 flex w-full items-center gap-4 overflow-x-auto bg-white px-10 py-2">
      <Window position={1} isCurrent={true} />
      <Window position={2} />
      <Window position={3} />
      <Window position={4} />
      <Window position={5} />
      <Window position={6} />
      <Window position={7} />
      <Window position={8} />
      <Window position={9} />
      <Window position={10} />
    </ol>
  );
};
