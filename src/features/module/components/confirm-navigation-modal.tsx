import { Button } from '@/components/ui/button';
import { useNavigationModal } from '@/features/module/store/use-navigation-modal';
import { useNavigate } from 'react-router';

export const ConfirmNavigationModal = () => {
  const navigate = useNavigate();
  const { isModalOpen, closeModal, confirmNavigation, nextPath, onSubmit } =
    useNavigationModal();

  if (!isModalOpen) return null;

  const handleConfirm = () => {
    if (onSubmit) onSubmit();
    confirmNavigation();
    if (nextPath) navigate(nextPath);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="max-w-140 space-y-5 rounded bg-white p-6 shadow-xl lg:space-y-6">
        <h2 className="text-xl font-bold lg:text-2xl">Confirmar navegação</h2>
        <p className="text-lg">
          Tem certeza que deseja prosseguir? Isso irá enviar os dados
          preenchidos.
        </p>
        <div className="flex justify-end gap-4 rounded">
          <Button
            onClick={closeModal}
            variant={'ghost'}
            className="hover:bg-transparent hover:text-red-500"
          >
            Cancelar
          </Button>
          <Button onClick={handleConfirm} type="submit">
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
};
