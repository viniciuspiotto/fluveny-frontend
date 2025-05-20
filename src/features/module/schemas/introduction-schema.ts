import { z } from 'zod';

export const createIntroductionModuleSchema = z.object({
  textBlock: z.string().min(1),
});

export type CreateIntroductionModuleSchema = z.infer<
  typeof createIntroductionModuleSchema
>;
