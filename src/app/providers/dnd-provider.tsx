import type { ReactNode } from 'react';
import { DndProvider as DndProviderDep } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface ReactQueryProviderProps {
  children: ReactNode;
}

export function DndProvider({ children }: ReactQueryProviderProps) {
  return <DndProviderDep backend={HTML5Backend}>{children}</DndProviderDep>;
}
