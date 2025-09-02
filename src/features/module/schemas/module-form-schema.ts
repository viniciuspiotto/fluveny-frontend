import { z } from 'zod';

export const moduleFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'Título é obrigatório e deve ter pelo menos 2 caracteres')
    .max(100, 'Título é obrigatório e deve ter no máximo 100 caracteres'),
  id_grammarRules: z
    .array(z.string())
    .min(1, 'Selecione ao menos um tópico')
    .max(5, 'Máximo de 5 tópicos'),
  id_level: z.string().min(1, 'Nível de dificuldade é obrigatório'),
  description: z
    .string()
    .trim()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres'),
});

export type ModuleForm = z.infer<typeof moduleFormSchema>;
