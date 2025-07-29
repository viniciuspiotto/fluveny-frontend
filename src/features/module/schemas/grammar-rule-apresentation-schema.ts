import { z } from 'zod';

export const grammarRulePresentationSchema = z.object({
  title: z.string().trim().min(1, { message: 'Título é obrigatório' }),
  textBlock: z.string().trim().min(8, { message: 'Descrição é obrigatório' }),
});

export type GrammarRulePresentationData = z.infer<
  typeof grammarRulePresentationSchema
>;
