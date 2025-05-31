import type { StepMode } from '@/@types/module';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StepKey = string;

type ModuleWizardState = {
  steps: StepKey[];
  stepCompletion: Record<StepKey, boolean>;
  stepModes: Record<StepKey, StepMode>;
  currentStep: StepKey | null;
  setSteps: (steps: StepKey[]) => void;
  setStepCompletion: (step: StepKey, isComplete: boolean) => void;
  setStepModes: (step: StepKey, mode: StepMode) => void;
  setCurrentStep: (step: StepKey) => void;
  resetStepModes: () => void;
};

export const useModuleWizard = create<ModuleWizardState>()(
  persist(
    (set) => ({
      steps: [],
      stepCompletion: {},
      currentStep: null,
      stepModes: {},
      setSteps: (steps) =>
        set(() => {
          const stepCompletion: Record<StepKey, boolean> = {};
          const stepModes: Record<StepKey, StepMode> = {};

          for (const step of steps) {
            stepCompletion[step] = false;
            stepModes[step] = 'create';
          }

          return {
            steps,
            stepCompletion,
            stepModes,
          };
        }),
      setStepCompletion: (step, isComplete) =>
        set((state) => {
          if (
            !(step in state.stepCompletion) ||
            state.stepCompletion[step] === isComplete
          )
            return state;
          return {
            stepCompletion: {
              ...state.stepCompletion,
              [step]: isComplete,
            },
          };
        }),
      setStepModes: (step, mode: StepMode) =>
        set((state) => ({
          stepModes: {
            ...state.stepModes,
            [step]: mode,
          },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetStepModes: () =>
        set((state) => {
          const resetModes: Record<StepKey, StepMode> = {};
          for (const step of state.steps) {
            resetModes[step] = 'create';
          }
          return {
            stepModes: resetModes,
          };
        }),
    }),
    {
      name: 'wizard-progress',
    },
  ),
);
