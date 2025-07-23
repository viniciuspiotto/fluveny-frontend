import { z } from 'zod';

export const introductionSchema = z.object({
  textBlock: z
    .string()
    .trim()
    .min(1, { message: 'A introdução é obrigatória' }),
});

export type IntroductionData = z.infer<typeof introductionSchema>;
