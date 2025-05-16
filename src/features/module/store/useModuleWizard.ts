import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StepStatus = {
  [key: string]: boolean;
};

type ModuleWizardState = {
  stepCompletion: StepStatus;
  setStepCompletion: (step: string, isComplete: boolean) => void;
};

export const useModuleWizard = create<ModuleWizardState>()(
  persist(
    (set) => ({
      stepCompletion: {},
      setStepCompletion: (step, isComplete) =>
        set((state) => {
          if (state.stepCompletion[step] === isComplete) return state;
          return {
            stepCompletion: {
              ...state.stepCompletion,
              [step]: isComplete,
            },
          };
        }),
    }),
    {
      name: 'wizard-progress',
    },
  ),
);
