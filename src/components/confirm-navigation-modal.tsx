import { Button } from '@/components/ui/button'; // Ajuste o caminho conforme sua configuração
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useConfirmModalStore } from '@/features/module/store/use-confirm-modal-store';

export function ConfirmNavigationModal() {
  const { isOpen, message, onConfirm, onCancel, closeModal } =
    useConfirmModalStore();

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    onCancel();
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmação de Navegação</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Continuar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
