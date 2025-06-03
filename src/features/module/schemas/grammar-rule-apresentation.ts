import { z } from 'zod';

export const grammarRuleApresentationSchema = z.object({
  sentence: z.string().min(1, { message: 'Cabeçalho é obrigatório' }),
  description: z.string().min(1, { message: 'Descrição é obrigatório' }),
});

export type GrammarRuleApresentationData = z.infer<
  typeof grammarRuleApresentationSchema
>;
