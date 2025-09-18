import { z } from 'zod';

const usernameValidation = z
  .string()
  .trim()
  .min(8, 'Nome de usuário deve ter pelo menos 8 caracteres')
  .max(100, 'Nome de usuário deve ter no máximo 100 caracteres')
  .regex(
    /^[a-zA-Z0-9_.-]+$/,
    'Nome de usuário pode conter apenas letras, números e os caracteres _, ., -',
  );

const emailValidation = z
  .string()
  .email('Formato de e-mail inválido')
  .min(8, 'O e-mail deve ter pelo menos 8 caracteres')
  .max(100, 'E-mail deve ter no máximo 100 caracteres');

export const loginSchema = z.object({
  usernameOrEmail: z
    .string({
      required_error: 'O campo é obrigatório',
    })
    .trim()
    .min(1, 'O campo é obrigatório')
    .superRefine((value, ctx) => {
      if (value.includes('@')) {
        const emailCheck = emailValidation.safeParse(value);
        if (!emailCheck.success) {
          emailCheck.error.issues.forEach((issue) => ctx.addIssue(issue));
        }
      } else {
        const usernameCheck = usernameValidation.safeParse(value);
        if (!usernameCheck.success) {
          usernameCheck.error.issues.forEach((issue) => ctx.addIssue(issue));
        }
      }
    }),

  password: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .max(200, 'A senha deve ter no máximo 200 caracteres')
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_]).{8,}$/,
      'A senha deve conter ao menos: 1 letra maiúscula, 1 número e 1 caractere especial (!@#$%)',
    ),
});

export type LoginForm = z.infer<typeof loginSchema>;
