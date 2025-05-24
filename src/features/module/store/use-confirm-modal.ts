import { create } from 'zustand';

type State = {
  nextPath: string | null;
  isModalOpen: boolean;
  onSubmit: (() => void) | null;
  openModal: (path: string) => void;
  closeModal: () => void;
  confirmNavigation: () => void;
  setOnSubmit: (onSubmit: () => void) => void;
};

export const useConfirmModal = create<State>((set) => ({
  nextPath: null,
  isModalOpen: false,
  onSubmit: null,
  openModal: (path) => set({ isModalOpen: true, nextPath: path }),
  closeModal: () => set({ isModalOpen: false, nextPath: null, onSubmit: null }),
  confirmNavigation: () =>
    set({ isModalOpen: false, nextPath: null, onSubmit: null }),
  setOnSubmit: (onSubmit) => set({ onSubmit }),
}));
