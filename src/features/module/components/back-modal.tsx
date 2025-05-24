import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useBackModal } from '../store/use-back-modal';

export const BackModal = () => {
  const navigate = useNavigate();
  const { isBackModalOpen, closeModal, confirmBackNavigation, nextPath } =
    useBackModal();

  if (!isBackModalOpen) return null;

  const handleConfirm = () => {
    confirmBackNavigation();
    navigate(nextPath!);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="max-w-140 space-y-5 rounded bg-white p-6 shadow-xl lg:space-y-6">
        <h2 className="text-xl font-bold lg:text-2xl">Voltar para o menu</h2>
        <p className="text-lg">
          Tem certeza que deseja voltar para o menu? os dados serão salvos
          temporariamente
        </p>
        <div className="flex justify-end gap-4 rounded">
          <Button
            onClick={closeModal}
            variant={'ghost'}
            className="hover:bg-transparent hover:text-red-500"
          >
            Cancelar
          </Button>
          <Button onClick={handleConfirm} type="button">
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
};
