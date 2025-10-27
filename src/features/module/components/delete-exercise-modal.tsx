import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertTriangle } from 'lucide-react';

interface DeleteWindowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteWindowModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteWindowModalProps) => {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-destructive size-6" />
            <DialogTitle className="text-xl">Excluir Janela</DialogTitle>
          </div>
          <DialogDescription className="pt-2 text-left">
            Tem certeza que deseja excluir esta janela? Esta ação não pode ser
            desfeita.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Sim, excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
