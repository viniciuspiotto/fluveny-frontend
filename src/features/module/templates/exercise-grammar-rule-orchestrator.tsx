import type { ExerciseStyle } from '@/@types/exercise';
import { NotFound } from '@/templates/not-found';
import type React from 'react';
import { useParams } from 'react-router';
import { FormGrammarRuleBuildPhrasePage } from '../pages/form-grammar-rule-build-phrase-page';
import { FormGrammarRuleExerciseTranslatePage } from '../pages/form-grammar-rule-exercise-translate-page';
export const ExerciseGrammarRuleOrchestrator = () => {
  const { style } = useParams<{
    style: ExerciseStyle;
  }>();

  const EXERCISE_COMPONENTS_MAP: Record<
    ExerciseStyle,
    React.ComponentType<any>
  > = {
    TRANSLATE: FormGrammarRuleExerciseTranslatePage,
    ORGANIZE: FormGrammarRuleBuildPhrasePage,
  };

  const ExerciseFormComponent = style
    ? EXERCISE_COMPONENTS_MAP[style]
    : undefined;

  if (!ExerciseFormComponent) {
    return <NotFound />;
  }

  return <ExerciseFormComponent />;
};
