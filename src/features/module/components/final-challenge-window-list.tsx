import { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import { deleteFinalChallengeExercise } from '../services/mutation/delete-final-challenge-exercise';
import { useFinalChallengeExercise } from '../stores/use-final-challenge-exercises';
import { DeleteWindowModal } from './delete-exercise-modal';
import { Window } from './window';

type ExerciseToDelete = {
  id: string | undefined;
  isDraft: boolean;
};

export const FinalChallengeContentWindow = () => {
  const {
    exerciseList,
    currentPosition,
    setCurrentPosition,
    moveExercise,
    removeExercise,
  } = useFinalChallengeExercise();
  const { moduleId } = useParams();

  const [exerciseToDelete, setExerciseToDelete] =
    useState<ExerciseToDelete | null>(null);

  const handleDeleteExercise = async (
    exerciseId: string | undefined,
    isDraft: boolean,
  ) => {
    if (exerciseList.length <= 1) {
      toast.error('Não é possível deletar todos os exercícios!');
      return;
    }

    const deletedIndex = exerciseList.findIndex((e) =>
      isDraft ? e.clientId === exerciseId : e.id === exerciseId,
    );

    if (deletedIndex === -1) {
      toast.error('Erro ao processar exclusão (exercício não encontrado).');
      return;
    }

    if (!isDraft) {
      if (!moduleId || !exerciseId) {
        toast.error('Erro ao excluir exercício: IDs ausentes');
        return;
      }
      try {
        await deleteFinalChallengeExercise(moduleId, exerciseId);
      } catch {
        toast.error('Erro ao tentar excluir exercício');
        return;
      }
    }

    removeExercise(deletedIndex);
    toast.success('Exercício deletado com sucesso!');
  };

  const handleConfirmDelete = () => {
    if (exerciseToDelete) {
      handleDeleteExercise(exerciseToDelete.id, exerciseToDelete.isDraft);
      setExerciseToDelete(null);
    }
  };

  const handleOpenDeleteModal = (
    exerciseId: string | undefined,
    isDraft: boolean,
  ) => {
    setExerciseToDelete({ id: exerciseId, isDraft });
  };

  return (
    <>
      <ol className="custom-scrollbar fixed bottom-0 left-0 mb-20 flex w-full items-center gap-4 overflow-x-auto bg-white px-4 py-8 lg:px-10">
        {exerciseList.map((e, i) => (
          <Window
            isPresentationEnabled={false}
            id={e.id ?? e.clientId}
            position={i + 1}
            key={e.id || e.clientId}
            isCurrent={(currentPosition ?? -1) === i}
            selectWindow={() => setCurrentPosition(i)}
            isDraft={!e.id}
            type={e.type}
            moveWindow={moveExercise}
            handleDeleteWindow={handleOpenDeleteModal}
          />
        ))}
      </ol>
      <DeleteWindowModal
        isOpen={exerciseToDelete !== null}
        onClose={() => setExerciseToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
