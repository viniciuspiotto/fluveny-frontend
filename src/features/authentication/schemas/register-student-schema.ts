import { z } from 'zod';

export const registerStudentFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(8, 'Nome de usuário é obrigatório e deve ter pelo menos 8 caracteres')
    .max(100, 'Nome de usuário deve ter no máximo 100 caracteres'),
  email: z.string().trim().email('E-mail inválido ou incorreto'),
  password: z
    .string()
    .min(8, 'A senha é obrigatória e deve ter no mínimo 8 caracteres')
    .max(200, 'A senha deve ter no máximo 200 caracteres')
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_]).{8,}$/,
      'A senha deve conter, pelo menos, um caractere especial, uma letra  maiúscula, uma letra minúscula, e um número',
    ),
});

export type RegisterStudentForm = z.infer<typeof registerStudentFormSchema>;
