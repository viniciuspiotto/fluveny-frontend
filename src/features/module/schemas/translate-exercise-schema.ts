import { z } from 'zod';

export const TranslateExerciseSchema = z.object({
  header: z.string().trim().min(1, { message: 'Cabeçalho é obrigatório' }),
  phrase: z.string().trim().min(1, { message: 'Frase é obrigatório' }),
  template: z.string().trim().min(1, { message: 'Gabarito é obrigatório' }),
  justification: z
    .string()
    .trim()
    .min(1, { message: 'Justificação é obrigatório' }),
});

export type TranslateExerciseForm = z.infer<typeof TranslateExerciseSchema>;
