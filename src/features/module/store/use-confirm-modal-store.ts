import { create } from 'zustand';

interface ConfirmModalState {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  openModal: (
    message: string,
    onConfirm: () => void,
    onCancel: () => void,
  ) => void;
  closeModal: () => void;
}

export const useConfirmModalStore = create<ConfirmModalState>((set) => ({
  isOpen: false,
  message: '',
  onConfirm: () => {},
  onCancel: () => {},
  openModal: (message, onConfirm, onCancel) =>
    set({
      isOpen: true,
      message,
      onConfirm,
      onCancel,
    }),
  closeModal: () =>
    set({
      isOpen: false,
      message: '',
      onConfirm: () => {},
      onCancel: () => {},
    }),
}));
