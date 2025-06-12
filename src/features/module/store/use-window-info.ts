import type { WindowType } from '@/@types/module';
import { create } from 'zustand';

type WindowState = {
  id: string;
  position: number;
  isCurrent: boolean;
  type: WindowType;
};

type WindowInfoState = {
  windows: WindowState[];
  addWindow: (afterPosition: number, type: WindowType) => void;
  setCurrent: (positionId: number) => void;
};

export const useWindowInfo = create<WindowInfoState>((set) => ({
  windows: [
    {
      id: crypto.randomUUID(),
      position: 1,
      isCurrent: true,
      type: 'presentation',
    },
  ],
  addWindow: (afterPosition, type) =>
    set((state) => {
      const newWindow: WindowState = {
        id: crypto.randomUUID(),
        position: 0,
        isCurrent: true,
        type: type,
      };
      const updatedWindows = [
        ...state.windows.slice(0, afterPosition),
        newWindow,
        ...state.windows.slice(afterPosition),
      ].map((window, index) => ({
        ...window,
        position: index + 1,
        isCurrent: window.id === newWindow.id,
      }));
      return { windows: updatedWindows };
    }),
  setCurrent: (positionId) =>
    set((state) => ({
      windows: state.windows.map((w) => ({
        ...w,
        isCurrent: w.position === positionId,
      })),
    })),
}));
