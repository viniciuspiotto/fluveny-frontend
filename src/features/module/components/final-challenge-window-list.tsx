import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useFinalChallengeExercise } from '../stores/use-final-challenge-exercises';
import { WindowList } from './window-list';

export const FinalChallengeContentWindow = () => {
  const exerciseList = useFinalChallengeExercise((state) => state.exerciseList);
  const currentPosition = useFinalChallengeExercise(
    (state) => state.currentPosition,
  );
  const setCurrentPosition = useFinalChallengeExercise(
    (state) => state.setCurrentPosition,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPosition !== null && exerciseList[currentPosition]) {
      const currentWindow = exerciseList[currentPosition];
      const path = `${currentWindow.id ? `${currentWindow.id}` : ''}`;
      navigate(path);
    }
  }, [currentPosition, exerciseList, navigate]);

  return (
    <WindowList
      isPresentationEnabled={false}
      windows={exerciseList}
      currentPosition={currentPosition}
      onSelectWindow={setCurrentPosition}
    />
  );
};
