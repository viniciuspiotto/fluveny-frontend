import { ROUTES } from '@/app/configs/routes';
import { DndProvider } from '@/app/providers/dnd-provider';
import { DraftWindowsModal } from '@/components/modal';
import { NotFound } from '@/templates/not-found';
import { useEffect } from 'react';
import { useBlocker, useNavigate, useParams } from 'react-router';
import FormExercisePageSkeleton from '../components/exercise-page-skeleton';
import { FinalChallengeContentWindow } from '../components/final-challenge-window-list';
import {
  useFinalChallengeExercise,
  type Exercise,
} from '../stores/use-final-challenge-exercises';
import { FormExerciseFinalChallengePage } from './form-exercise-final-challenge.page';

const exercises = undefined;

export const FormFinalChallengePage = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();

  // TODO: endpoint to get final challenge windows
  const isLoadingExercises = false;
  // const { data: exercises, isLoading: isLoadingExercises } =
  //   useGetFinalChallengeContent(moduleId);

  // TODO: endpoint to update the final challenge windows position
  // const updateFinalChallengeWindows = useUpdateFinalChallengeWindows();

  const exerciseList = useFinalChallengeExercise((state) => state.exerciseList);
  const setExerciseList = useFinalChallengeExercise(
    (state) => state.setExerciseList,
  );
  const currentPosition = useFinalChallengeExercise(
    (state) => state.currentPosition,
  );
  const setCurrentPosition = useFinalChallengeExercise(
    (state) => state.setCurrentPosition,
  );

  // TODO: check if have a draft exercise
  const hasDraftExercises = exerciseList.some((e) => !e.id);

  const blocker = useBlocker(({ nextLocation }) => {
    if (!moduleId) return false;

    const finalChallengeBasePath = `/${ROUTES.modules}/${ROUTES.create}/${moduleId}/
    ${ROUTES.finalChallenge}`;
    const isNavigatingWithinEditor = nextLocation.pathname.startsWith(
      finalChallengeBasePath,
    );

    return !isNavigatingWithinEditor;
  });

  // const onSendExercisesPosition = useCallback(
  //   (data: Exercise[]) => {
  //     // const exercisesWithId = data
  //     //   .filter((w) => w.id)
  //     //   .map(({ id, style }) => ({
  //     //     id,
  //     //     style,
  //     //   }));
  //     // updateFinalChallengeWindows.mutate(
  //     //   { moduleId, data: exercisesWithId },
  //     //   {
  //     //     onSuccess: () => {},
  //     //   },
  //     // );
  //   },
  //   [moduleId],
  // );

  // TODO: check if is in blocked state and has draft exercises
  useEffect(() => {
    if (blocker.state === 'blocked' && !hasDraftExercises) {
      // onSendExercisesPosition(exerciseList);
      blocker.proceed();
    }
  }, [blocker, hasDraftExercises, exerciseList]);

  const handleConfirmNavigation = () => {
    if (blocker.state === 'blocked') {
      // const windowsToSave = exerciseList.filter((e) => e.id);
      // onSendExercisesPosition(windowsToSave);
      blocker.proceed();
    }
  };

  const handleCancelNavigation = () => {
    if (blocker.state === 'blocked') {
      blocker.reset();
    }
  };

  const currentWindow =
    currentPosition !== null ? exerciseList[currentPosition] : null;
  const uniqueKey = currentWindow?.id ?? currentWindow?.clientId;

  useEffect(() => {
    if (exercises) {
      const windowsWithClientId = exercises.map(
        (w) =>
          ({
            ...w,
            clientId: w.id,
          }) as Exercise,
      );
      setExerciseList(windowsWithClientId);
      setCurrentPosition(0);

      if (exercises.length > 0) {
        const firstWindow = exercises[0];
        navigate(`${firstWindow.id}`, {
          replace: true,
        });
      }
    } else if (!isLoadingExercises) {
      console.log('carreguei');
      setExerciseList([
        { style: 'TRANSLATE', type: 'EXERCISE', clientId: crypto.randomUUID() },
      ]);
      setCurrentPosition(0);
    }
  }, [isLoadingExercises, navigate, setExerciseList, setCurrentPosition]);

  if (isLoadingExercises) {
    return <FormExercisePageSkeleton />;
  }

  if (!moduleId) return <NotFound />;

  return (
    <DndProvider key={`${moduleId}-finalChallenge`}>
      <div>
        <FormExerciseFinalChallengePage key={uniqueKey} />
        <FinalChallengeContentWindow />
        <DraftWindowsModal
          key={'final-challenge'}
          isOpen={blocker.state === 'blocked' && hasDraftExercises}
          onCancel={handleCancelNavigation}
          onConfirm={handleConfirmNavigation}
          windowsList={exerciseList}
        />
      </div>
    </DndProvider>
  );
};
