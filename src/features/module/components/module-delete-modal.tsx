import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { AlertTriangle } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { deleteModule } from '../services/mutation/delete-module';
import { getModule } from '../services/queries/get-module';

interface DeleteModalProps {
  children: ReactNode;
}

export const DeleteModal = ({ children }: DeleteModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const [moduleTitle, setModuleTitle] = useState('');
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function setTitle() {
      if (!moduleId) return;
      try {
        const moduleData = await getModule(moduleId);
        setModuleTitle(moduleData.data.title);
      } catch (error) {
        setModuleTitle('N/A');
        console.error(error);
        toast.error('Não foi possível carregar o nome do módulo.');
      }
    }
    setTitle();
  }, [moduleId]);

  function handleDelete() {
    if (!moduleId) return;
    deleteModule(moduleId)
      .then(() => {
        navigate('/modules/drafts');
        toast.success('Módulo excluído com sucesso');
      })
      .catch(() => {
        toast.error('Erro ao exluir o módulo');
      });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-destructive size-6" />
            <DialogTitle className="text-xl">Confirmar Exclusão</DialogTitle>
          </div>
          <DialogDescription className="pt-2 text-left">
            Esta ação é irreversível. Para confirmar, digite
            <strong className="text-foreground px-1 font-medium select-none">
              {moduleTitle}
            </strong>
            no campo abaixo.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <Input
            type="text"
            placeholder="Digite o nome do módulo"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoComplete="off"
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={inputValue !== moduleTitle}
            onClick={handleDelete}
          >
            Eu entendo, excluir este módulo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
