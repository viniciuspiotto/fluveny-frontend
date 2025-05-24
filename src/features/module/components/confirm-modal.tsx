import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useConfirmModal } from '../store/use-confirm-modal';
import { useModuleWizard } from '../store/use-module-wizard';

export const ConfirmModal = () => {
  const navigate = useNavigate();
  const {
    isModalOpen,
    closeModal,
    confirmNavigation,
    nextPath,
    onSubmit,
    nextStep,
  } = useConfirmModal();
  const { setCurrentStep } = useModuleWizard();

  if (!isModalOpen) return null;

  const handleConfirm = () => {
    if (onSubmit) onSubmit();
    if (nextPath && nextStep) {
      setCurrentStep(nextStep);
      navigate(nextPath);
      confirmNavigation();
    }
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
