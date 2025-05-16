import { useNavigationModal } from '@/features/module/store/useNavigationModal';
import { useNavigate } from 'react-router';

export const ConfirmNavigationModal = () => {
  const navigate = useNavigate();
  const { isModalOpen, closeModal, confirmNavigation, nextPath } =
    useNavigationModal();

  if (!isModalOpen) return null;

  const handleConfirm = () => {
    confirmNavigation();
    if (typeof nextPath === 'number') navigate(nextPath);
    if (typeof nextPath === 'string') navigate(nextPath);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="space-y-4 rounded bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold">Confirmar navegação</h2>
        <p>
          Tem certeza que deseja prosseguir? Isso irá enviar os dados
          preenchidos.
        </p>
        <div className="flex justify-end gap-4">
          <button onClick={closeModal}>Cancelar</button>
          <button
            onClick={handleConfirm}
            className="bg-primary rounded px-4 py-2 text-white"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
