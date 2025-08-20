import type { WindowType } from '@/@types/module';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PresentationForm } from '../schemas/presentation-schema';
import type { TranslateExerciseForm } from '../schemas/translate-exercise-schema';

type PresentationWindow = {
  id?: string;
  clientId: string;
  type: 'PRESENTATION';
  draftData?: Partial<PresentationForm>;
};

type ExerciseWindow = {
  id?: string;
  type: 'EXERCISE';
  clientId: string;
  draftData?: Partial<TranslateExerciseForm>;
};

export type WindowList = PresentationWindow | ExerciseWindow;

type GrammarRuleModuleWindowsStoreState = {
  windowsList: WindowList[];
  currentPosition: null | number;
  setWindowsList: (list: WindowList[]) => void;
  setCurrentPosition: (position: number) => void;
  addWindow: (window: WindowType, index: number) => void;
  moveWindow: (dragIndex: number, hoverIndex: number) => void;
  updateDraftData: (index: number, data: WindowList['draftData']) => void;
};

export const useGrammarRuleModuleWindows =
  create<GrammarRuleModuleWindowsStoreState>()(
    persist(
      (set) => ({
        windowsList: [],
        currentPosition: null,
        setWindowsList: (list) => {
          const listWithClientIds = list.map((w) => ({
            ...w,
            clientId: w.id || crypto.randomUUID(),
          }));
          set({ windowsList: listWithClientIds });
        },
        setCurrentPosition: (position) => set({ currentPosition: position }),
        addWindow: (type, index) =>
          set((state) => {
            const newList = [...state.windowsList];
            const newWindowWithIds = {
              type,
              clientId: crypto.randomUUID(),
              draftData: {},
            };
            newList.splice(index, 0, newWindowWithIds);
            return { windowsList: newList, currentPosition: index };
          }),
        moveWindow: (dragIndex, hoverIndex) =>
          set((state) => {
            const reordered = [...state.windowsList];
            const [dragged] = reordered.splice(dragIndex, 1);
            reordered.splice(hoverIndex, 0, dragged);

            return { windowsList: reordered };
          }),
        updateDraftData: (index, data) =>
          set((state) => {
            const newList = [...state.windowsList];
            if (newList[index]) {
              newList[index].draftData = data;
            }
            return { windowsList: newList };
          }),
      }),
      {
        name: 'windows-grammar-rule-module',
      },
    ),
  );
