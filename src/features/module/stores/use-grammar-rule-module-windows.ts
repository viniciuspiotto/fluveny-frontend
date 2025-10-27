import type { ExerciseStyle } from '@/@types/exercise';
import type { WindowType } from '@/@types/module';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BuildPhraseExerciseForm } from '../schemas/build-phrase-schema';
import type { FillInTheBlankSchemaForm } from '../schemas/fill-in-the-blanks-schema';
import type { PresentationForm } from '../schemas/presentation-schema';
import type { TranslateExerciseForm } from '../schemas/translate-exercise-schema';

type PresentationWindow = {
  id?: string;
  clientId?: string;
  type: 'PRESENTATION';
  draftData?: Partial<PresentationForm>;
};

type ExerciseWindow = {
  id?: string;
  type: 'EXERCISE';
  style: ExerciseStyle;
  clientId?: string;
  draftData?:
    | Partial<TranslateExerciseForm>
    | Partial<BuildPhraseExerciseForm>
    | Partial<FillInTheBlankSchemaForm>;
};

export type WindowsType = PresentationWindow | ExerciseWindow;

type GrammarRuleModuleWindowsStoreState = {
  windowsList: WindowsType[];
  currentPosition: null | number;
  setWindowsList: (list: WindowsType[]) => void;
  setCurrentPosition: (position: number) => void;
  addWindow: (index: number, window: WindowType, style?: ExerciseStyle) => void;
  moveWindow: (dragIndex: number, hoverIndex: number) => void;
  updateDraftData: (index: number, data: WindowsType['draftData']) => void;
  removeWindow: (indexToRemove: number) => void;
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
        addWindow: (index, type, style) =>
          set((state) => {
            const newList = [...state.windowsList];
            let newWindow: WindowsType;

            if (type === 'EXERCISE') {
              newWindow = {
                type: 'EXERCISE',
                style: style || 'TRANSLATE',
                clientId: crypto.randomUUID(),
                draftData: {},
              };
            } else {
              newWindow = {
                type: 'PRESENTATION',
                clientId: crypto.randomUUID(),
                draftData: {},
              };
            }

            newList.splice(index, 0, newWindow);
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
        removeWindow: (indexToRemove) =>
          set((state) => {
            const oldPosition = state.currentPosition;
            const newList = state.windowsList.filter(
              (_, index) => index !== indexToRemove,
            );

            if (newList.length === 0) {
              return { windowsList: [], currentPosition: null };
            }

            if (oldPosition === null) {
              return { windowsList: newList };
            }

            let newPosition = oldPosition;
            if (indexToRemove < oldPosition) {
              newPosition = oldPosition - 1;
            } else if (indexToRemove === oldPosition) {
              newPosition = Math.max(0, oldPosition - 1);
            }

            return { windowsList: newList, currentPosition: newPosition };
          }),
      }),
      {
        name: 'windows-grammar-rule-module',
      },
    ),
  );
