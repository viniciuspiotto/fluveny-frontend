import type { ExerciseStyle } from '@/@types/exercise';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BuildPhraseExerciseForm } from '../schemas/build-phrase-schema';
import type { FillInTheBlankSchemaForm } from '../schemas/fill-in-the-blanks-schema';
import type { TranslateExerciseForm } from '../schemas/translate-exercise-schema';

export type Exercise = {
  id?: string;
  clientId?: string;
  type: 'EXERCISE';
  style: ExerciseStyle;
  draftData?:
    | Partial<TranslateExerciseForm>
    | Partial<BuildPhraseExerciseForm>
    | Partial<FillInTheBlankSchemaForm>;
};

type FinalChallengeExerciseStoreState = {
  exerciseList: Exercise[];
  currentPosition: null | number;
  setExerciseList: (list: Exercise[]) => void;
  setCurrentPosition: (position: number) => void;
  addExercise: (index: number, style: ExerciseStyle) => void;
  moveExercise: (dragIndex: number, hoverIndex: number) => void;
  updateDraftData: (index: number, data: Exercise['draftData']) => void;
  removeExercise: (indexToRemove: number) => void;
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
        setCurrentPosition: (position) => {
          set({ currentPosition: position });
        },
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
            const newList = state.exerciseList.map((exercise, i) => {
              if (i === index) {
                return {
                  ...exercise,
                  draftData: data,
                };
              }
              return exercise;
            });

            return { exerciseList: newList };
          }),
        removeExercise: (indexToRemove) =>
          set((state) => {
            const oldPosition = state.currentPosition;
            const newList = state.exerciseList.filter(
              (_, index) => index !== indexToRemove,
            );

            if (newList.length === 0) {
              return { exerciseList: [], currentPosition: null };
            }

            if (oldPosition === null) {
              return { exerciseList: newList };
            }

            let newPosition = oldPosition;
            if (indexToRemove < oldPosition) {
              newPosition = oldPosition - 1;
            } else if (indexToRemove === oldPosition) {
              newPosition = Math.max(0, oldPosition - 1);
            }

            return { exerciseList: newList, currentPosition: newPosition };
          }),
      }),
      {
        name: 'exercises-final-challenge',
      },
    ),
  );
