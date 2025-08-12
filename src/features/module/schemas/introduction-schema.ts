import { z } from 'zod';

export const introductionFormSchema = z.object({
  textBlock: z
    .string()
    .trim()
    .min(8, { message: 'A introdução é obrigatória' }),
});

export type IntroductionForm = z.infer<typeof introductionFormSchema>;
