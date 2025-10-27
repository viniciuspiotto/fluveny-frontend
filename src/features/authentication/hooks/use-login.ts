import { useMutation } from '@tanstack/react-query';
import type { LoginForm } from '../schemas/login-schema';
import { login } from '../services/login';

interface LoginRequest {
  data: LoginForm;
}

export function useLogin() {
  return useMutation({
    mutationFn: async ({ data }: LoginRequest) => {
      const response = await login(data);

      return response.data;
    },
  });
}
