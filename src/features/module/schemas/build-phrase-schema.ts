import { z } from 'zod';

export const BuildPhraseExerciseSchema = z.object({
  originalSentence: z
    .string()
    .trim()
    .min(1, { message: 'Cabeçalho é obrigatório' }),
  translation: z.string().trim().min(1, { message: 'Frase é obrigatório' }),
  distractors: z.array(z.string()).max(5),
});

export type BuildPhraseExerciseForm = z.infer<typeof BuildPhraseExerciseSchema>;
