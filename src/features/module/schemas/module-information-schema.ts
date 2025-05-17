import { z } from 'zod';

export const createInformationModuleSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  id_grammarRules: z
    .array(z.string())
    .min(1, 'Selecione ao menos um tópico')
    .max(5, 'Máximo de 5 tópicos'),
  id_level: z.string().min(1, 'Nível de dificuldade é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
});

export type CreateInformationModuleData = z.infer<
  typeof createInformationModuleSchema
>;
