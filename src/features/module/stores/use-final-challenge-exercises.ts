import type { ExerciseStyle } from '@/@types/exercise';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BuildPhraseExerciseForm } from '../schemas/build-phrase-schema';
import type { TranslateExerciseForm } from '../schemas/translate-exercise-schema';

export type Exercise = {
  id?: string;
  clientId?: string;
  type: 'EXERCISE';
  style: ExerciseStyle;
  draftData?: Partial<TranslateExerciseForm> | Partial<BuildPhraseExerciseForm>;
};

type FinalChallengeExerciseStoreState = {
  exerciseList: Exercise[];
  currentPosition: null | number;
  setExerciseList: (list: Exercise[]) => void;
  setCurrentPosition: (position: number) => void;
  addExercise: (index: number, style: ExerciseStyle) => void;
  moveExercise: (dragIndex: number, hoverIndex: number) => void;
  updateDraftData: (index: number, data: Exercise['draftData']) => void;
};

export const useFinalChallengeExercise =
  create<FinalChallengeExerciseStoreState>()(
    persist(
      (set) => ({
        exerciseList: [],
        currentPosition: null,
        setExerciseList: (list) => {
          const listWithClientIds = list.map((w) => ({
            ...w,
            clientId: w.id || crypto.randomUUID(),
          }));
          set({ exerciseList: listWithClientIds });
        },
        setCurrentPosition: (position) => set({ currentPosition: position }),
        addExercise: (index, style) =>
          set((state) => {
            const newList = [...state.exerciseList];
            const newExerciseWithIds = {
              type: 'EXERCISE',
              clientId: crypto.randomUUID(),
              style: style,
              draftData: {},
            } as Exercise;
            newList.splice(index, 0, newExerciseWithIds);
            return { exerciseList: newList, currentPosition: index };
          }),
        moveExercise: (dragIndex, hoverIndex) =>
          set((state) => {
            const reordered = [...state.exerciseList];
            const [dragged] = reordered.splice(dragIndex, 1);
            reordered.splice(hoverIndex, 0, dragged);

            return { exerciseList: reordered };
          }),
        updateDraftData: (index, data) =>
          set((state) => {
            const newList = [...state.exerciseList];
            if (newList[index]) {
              newList[index].draftData = data;
            }
            return { exerciseList: newList };
          }),
      }),
      {
        name: 'exercises-final-challenge',
      },
    ),
  );
