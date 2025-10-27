import { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { deleteGrammarRuleWindow } from '../services/mutation/delete-grammar-rule-window';
import { useGrammarRuleModuleWindows } from '../stores/use-grammar-rule-module-windows';
import { DeleteWindowModal } from './delete-exercise-modal';
import { Window } from './window';

type WindowToDelete = {
  id: string | undefined;
  isDraft: boolean;
};

export const GrammarRuleWindowList = () => {
  const { moduleId, grammarRuleId } = useParams();
  const {
    windowsList,
    currentPosition,
    setCurrentPosition,
    moveWindow,
    removeWindow,
  } = useGrammarRuleModuleWindows();

  const [windowToDelete, setWindowToDelete] = useState<WindowToDelete | null>(
    null,
  );

  const handleOpenDeleteModal = (
    exerciseId: string | undefined,
    isDraft: boolean,
  ) => {
    setWindowToDelete({ id: exerciseId, isDraft });
  };

  const handleDeleteWindow = async (
    windowId: string | undefined,
    isDraft: boolean,
  ) => {
    if (windowsList.length <= 1) {
      toast.error('Não é possível deletar todos as janelas!');
      return;
    }

    const deletedIndex = windowsList.findIndex((w) =>
      isDraft ? w.clientId === windowId : w.id === windowId,
    );

    if (deletedIndex === -1) {
      toast.error('Erro ao processar exclusão (janela não encontrado).');
      return;
    }

    if (!isDraft) {
      if (!moduleId || !windowId || !grammarRuleId) {
        toast.error('Erro ao excluir janela');
        return;
      }
      try {
        await deleteGrammarRuleWindow(moduleId, grammarRuleId, windowId);
      } catch {
        toast.error('Erro ao tentar excluir janela');
        return;
      }
    }

    removeWindow(deletedIndex);
    toast.success('Exercício deletado com sucesso!');
  };

  const handleConfirmDelete = () => {
    if (windowToDelete) {
      handleDeleteWindow(windowToDelete.id, windowToDelete.isDraft);
      setWindowToDelete(null);
    }
  };

  return (
    <>
      <ol className="custom-scrollbar fixed bottom-0 left-0 mb-20 flex w-full items-center gap-4 overflow-x-auto bg-white px-4 py-8 lg:px-10">
        {windowsList.map((w, i) => (
          <Window
            isPresentationEnabled={true}
            id={w.id ?? w.clientId}
            position={i + 1}
            key={w.id || w.clientId}
            isCurrent={(currentPosition ?? -1) === i}
            selectWindow={() => setCurrentPosition(i)}
            isDraft={!w.id}
            type={w.type}
            moveWindow={moveWindow}
            handleDeleteWindow={handleOpenDeleteModal}
          />
        ))}
      </ol>
      <DeleteWindowModal
        isOpen={windowToDelete !== null}
        onClose={() => setWindowToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
