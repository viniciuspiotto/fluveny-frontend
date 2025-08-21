import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContentNoClose,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { deleteModule } from '../services/mutation/delete-module';
import { getModule } from '../services/queries/get-module';

interface DeleteModalProps {
  children: ReactNode;
}

export default function DeleteModal({ children }: DeleteModalProps) {
  const [inputValue, setInputValue] = useState('');
  const [moduleTitle, setModuleTitle] = useState('');
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function setTitle() {
      if (!moduleId) return;
      const moduleData = await getModule(moduleId);
      setModuleTitle(moduleData.data.title);
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
      <DialogContentNoClose
        className="p-4 md:max-w-2/3 lg:max-w-1/3"
        aria-describedby="Confirmar Deleção"
      >
        <div className="flex w-full flex-col items-center">
          <DialogTitle className="p-2 text-xl font-bold">
            Confirmar Exclusão
          </DialogTitle>
          <section>
            <p className="inline text-sm">
              Para confirmar a exclusão, digite o nome do Módulo:{' '}
            </p>
            <p className="inline text-sm text-gray-400 select-none">
              ({moduleTitle})
            </p>
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </section>
        </div>
        <div className="flex w-full justify-end">
          <DialogClose asChild>
            <Button variant="outline" className="mr-2">
              <p>Cancelar</p>
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              disabled={inputValue !== moduleTitle}
              onClick={handleDelete}
            >
              <p>Confirmar</p>
            </Button>
          </DialogClose>
        </div>
      </DialogContentNoClose>
    </Dialog>
  );
}
