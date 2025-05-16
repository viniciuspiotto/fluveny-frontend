import { create } from 'zustand';

type State = {
  nextPath: string | null;
  isModalOpen: boolean;
  openModal: (path: string) => void;
  closeModal: () => void;
  confirmNavigation: () => void;
};

export const useNavigationModal = create<State>((set, get) => ({
  nextPath: null,
  isModalOpen: false,
  openModal: (path) => set({ isModalOpen: true, nextPath: path }),
  closeModal: () => set({ isModalOpen: false, nextPath: null }),
  confirmNavigation: () => {
    const path = get().nextPath;
    if (path) {
      window.location.href = path;
    }
    set({ isModalOpen: false, nextPath: null });
  },
}));
