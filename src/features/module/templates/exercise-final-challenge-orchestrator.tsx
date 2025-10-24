import type { ExerciseStyle } from '@/@types/exercise';
import { NotFound } from '@/templates/not-found';
import type React from 'react';
import { useParams } from 'react-router';
import { FormFinalChallengeExerciseTranslatePage } from '../pages/form-final-challenge-exercise-translate-page';

export const ExerciseFinalChallengeOrchestrator = () => {
  const { style } = useParams<{
    style: ExerciseStyle;
  }>();

  const EXERCISE_COMPONENTS_MAP: Record<
    ExerciseStyle,
    React.ComponentType<any>
  > = {
    TRANSLATE: FormFinalChallengeExerciseTranslatePage,
  };

  const ExerciseFormComponent = style
    ? EXERCISE_COMPONENTS_MAP[style]
    : undefined;

  if (!ExerciseFormComponent) {
    return <NotFound />;
  }

  return <ExerciseFormComponent />;
};
