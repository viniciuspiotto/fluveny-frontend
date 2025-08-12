import { z } from 'zod';

export const presentationSchema = z.object({
  title: z.string().trim().min(1, { message: 'Título é obrigatório' }),
  textBlock: z.object({
    content: z.string().trim().min(8, { message: 'Descrição é obrigatório' }),
  }),
});

export type PresentationForm = z.infer<typeof presentationSchema>;
