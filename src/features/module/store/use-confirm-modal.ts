import { create } from 'zustand';

type State = {
  nextPath: string | null;
  nextStep: string | null;
  isModalOpen: boolean;
  onSubmit: (() => void) | null;
  openModal: (path: string, nextStep: string) => void;
  closeModal: () => void;
  confirmNavigation: () => void;
  setOnSubmit: (onSubmit: (() => void) | null) => void;
};

export const useConfirmModal = create<State>((set) => ({
  nextPath: null,
  nextStep: null,
  isModalOpen: false,
  onSubmit: null,
  openModal: (nextPath, nextStep) =>
    set({ isModalOpen: true, nextPath, nextStep }),
  closeModal: () => set({ isModalOpen: false, nextPath: null, onSubmit: null }),
  confirmNavigation: () =>
    set({ isModalOpen: false, nextPath: null, onSubmit: null }),
  setOnSubmit: (onSubmit) => set({ onSubmit }),
}));
