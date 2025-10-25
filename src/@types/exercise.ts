import type { BuildPhraseExerciseForm } from '@/features/module/schemas/build-phrase-schema';
import type { FillInTheBlankSchemaForm } from '@/features/module/schemas/fill-in-the-blanks-schema';
import type { TranslateExerciseForm } from '@/features/module/schemas/translate-exercise-schema';

export type ExerciseStyle =
  | 'TRANSLATE'
  | 'ORGANIZE'
  | 'FILL_IN_THE_BLANK'
  | 'INTERPRETATION'
  | 'FIND_SYNONYMS'
  | 'COMPLETE_PARAGRAPH'
  | 'DICTATION'
  | 'TRANSCRIPTION'
  | 'IDENTIFY_WORD';

export interface ExerciseBaseResponse {
  id: string;
  style: ExerciseStyle;
}

type TranslateExerciseResponse = ExerciseBaseResponse & TranslateExerciseForm;
type BuildPhraseExerciseResponse = ExerciseBaseResponse &
  BuildPhraseExerciseForm;
type FillInTheBlankExerciseResponse = ExerciseBaseResponse &
  FillInTheBlankSchemaForm;

export type ExerciseResponse =
  | TranslateExerciseResponse
  | BuildPhraseExerciseResponse
  | FillInTheBlankExerciseResponse;

export type ExerciseRequest =
  | TranslateExerciseForm
  | BuildPhraseExerciseForm
  | FillInTheBlankSchemaForm;
