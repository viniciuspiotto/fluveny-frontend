import { z } from 'zod';

export const moduleSchema = z.object({
  title: z
    .string()
    .min(2, 'Título é obrigatório e deve ter pelo menos 2 caracteres'),
  id_grammarRules: z
    .array(z.string())
    .min(1, 'Selecione ao menos um tópico')
    .max(5, 'Máximo de 5 tópicos'),
  id_level: z.string().min(1, 'Nível de dificuldade é obrigatório'),
  description: z
    .string()
    .min(10, 'Descrição é deve ter no mínimo 10 caracteres'),
});

export type ModuleData = z.infer<typeof moduleSchema>;
