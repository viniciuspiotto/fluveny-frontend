// src/features/module/store/use-field-completion-store.ts
import { create } from 'zustand';

interface State {
  fieldStatus: Record<string, Record<string, boolean>>;
  initializeStepFields: (stepName: string, fieldNames: string[]) => void;
  setFieldCompletion: (
    stepName: string,
    fieldName: string,
    isCompleted: boolean,
  ) => void;
  resetStepFields: (stepName: string) => void;
  getIsStepFullyCompleted: (stepName: string) => boolean;
}

export const useFieldCompletion = create<State>((set, get) => ({
  fieldStatus: {},

  initializeStepFields: (stepName, fieldNames) => {
    set((state) => {
      if (state.fieldStatus[stepName]) {
        return state;
      }

      const initialFields: Record<string, boolean> = {};
      fieldNames.forEach((name) => {
        initialFields[name] = false;
      });

      return {
        fieldStatus: {
          ...state.fieldStatus,
          [stepName]: initialFields,
        },
      };
    });
  },

  setFieldCompletion: (stepName, fieldName, isCompleted) => {
    set((state) => {
      if (!state.fieldStatus[stepName]) {
        console.warn(
          `Attempted to set field completion for unknown step: ${stepName}. Please initialize fields first.`,
        );
        return state;
      }
      return {
        fieldStatus: {
          ...state.fieldStatus,
          [stepName]: {
            ...state.fieldStatus[stepName],
            [fieldName]: isCompleted,
          },
        },
      };
    });
  },

  resetStepFields: (stepName) => {
    set((state) => {
      const newFieldStatus = { ...state.fieldStatus };
      delete newFieldStatus[stepName];
      return { fieldStatus: newFieldStatus };
    });
  },

  getIsStepFullyCompleted: (stepName: string) => {
    const stepFields = get().fieldStatus[stepName];
    if (!stepFields) {
      return false;
    }
    return Object.values(stepFields).every((status) => status === true);
  },
}));
