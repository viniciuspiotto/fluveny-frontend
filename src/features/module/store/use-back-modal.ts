import { create } from 'zustand';

type State = {
  nextPath: string | null;
  isBackModalOpen: boolean;
  openBackModal: (path: string) => void;
  closeModal: () => void;
  confirmBackNavigation: () => void;
};

export const useBackModal = create<State>((set) => ({
  nextPath: null,
  isBackModalOpen: false,
  onSubmit: null,
  openBackModal: (path: string) =>
    set({ isBackModalOpen: true, nextPath: path }),
  closeModal: () => set({ isBackModalOpen: false }),
  confirmBackNavigation: () => set({ isBackModalOpen: false, nextPath: null }),
}));
