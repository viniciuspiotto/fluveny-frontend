import { z } from 'zod';

export const createInformationModuleSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  topics: z
    .array(z.string())
    .min(1, 'Selecione ao menos um tópico')
    .max(5, 'Máximo de 5 tópicos'),
  level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1'], {
    required_error: 'Nível de dificuldade é obrigatório',
  }),
  description: z.string().min(1, 'Descrição é obrigatória'),
});

export type CreateInformationModuleData = z.infer<
  typeof createInformationModuleSchema
>;
