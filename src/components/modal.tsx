import { useGrammarRuleModuleWindows } from '@/features/module/stores/use-grammar-rule-module-windows';
import { BowArrow, Presentation } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface DraftWindowsModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DraftWindowsModal = ({
  isOpen,
  onCancel,
  onConfirm,
}: DraftWindowsModalProps) => {
  const windowsList = useGrammarRuleModuleWindows((state) => state.windowsList);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onCancel();
    }
  };

  const draftWindowsInfo = windowsList
    .map((window, index) => ({
      ...window,
      position: index + 1,
    }))
    .filter((window) => !window.id)
    .map(({ position, type }) => ({ position, type }));

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="items-start">
          <DialogTitle>Alterações não salvas</DialogTitle>
          <DialogDescription>
            Os rascunhos a abaixo não estão salvos, e suas informações serão
            excluídas:
          </DialogDescription>
        </DialogHeader>

        <ul className="my-4 flex flex-wrap gap-2 pl-5 text-sm">
          {draftWindowsInfo.map((draft) => (
            <li
              key={draft.position}
              className="relative flex h-15 w-20 items-center gap-3 rounded-md border-1 px-4"
            >
              <span className="absolute top-1 right-2">*</span>
              <span>{draft.position}</span>
              {draft.type === 'PRESENTATION' && <Presentation />}
              {draft.type === 'EXERCISE' && <BowArrow />}
            </li>
          ))}
        </ul>

        <DialogFooter className="flex">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button className="cursor-pointer" onClick={onConfirm}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
