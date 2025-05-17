import { create } from 'zustand';

type State = {
  nextPath: string | number | null;
  isModalOpen: boolean;
  openModal: (path: string | number) => void;
  closeModal: () => void;
  confirmNavigation: () => void;
};

export const useNavigationModal = create<State>((set) => ({
  nextPath: null,
  isModalOpen: false,
  openModal: (path) => set({ isModalOpen: true, nextPath: path }),
  closeModal: () => set({ isModalOpen: false, nextPath: null }),
  confirmNavigation: () => {
    set({ isModalOpen: false });
  },
}));
