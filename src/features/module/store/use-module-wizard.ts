import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StepKey = string;

type ModuleWizardState = {
  steps: StepKey[];
  stepCompletion: Record<StepKey, boolean>;
  currentStep: StepKey | null;
  setSteps: (steps: StepKey[]) => void;
  setStepCompletion: (step: StepKey, isComplete: boolean) => void;
  setCurrentStep: (step: StepKey) => void;
  nextStep: () => void;
};

export const useModuleWizard = create<ModuleWizardState>()(
  persist(
    (set) => ({
      steps: [],
      stepCompletion: {},
      currentStep: null,
      setSteps: (steps) =>
        set(() => {
          const initialStatus: Record<StepKey, boolean> = {};
          for (const step of steps) {
            initialStatus[step] = false;
          }
          return {
            steps,
            stepCompletion: initialStatus,
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
      setCurrentStep: (step) => set({ currentStep: step }),
      nextStep: () =>
        set((state) => {
          const { steps, currentStep } = state;
          if (!currentStep) return state;

          const currentIndex = steps.indexOf(currentStep);
          const nextIndex = currentIndex + 1;

          if (nextIndex >= steps.length) return state;

          return {
            currentStep: steps[nextIndex],
          };
        }),
    }),
    {
      name: 'wizard-progress',
    },
  ),
);
