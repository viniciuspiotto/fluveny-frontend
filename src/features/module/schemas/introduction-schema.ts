import { z } from 'zod';

export const introductionSchema = z.object({
  textBlock: z.string().min(1),
});

export type IntroductionData = z.infer<typeof introductionSchema>;
