import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { AnimateBlock } from '../components/animate-block';
import { PasswordInput } from '../components/password-input';
import { RegisterCamp } from '../components/register-camp';
import { useLogin } from '../hooks/use-login';
import { loginSchema, type LoginForm } from '../schemas/login-schema';

export const LoginPage = () => {
  const navigator = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const methods = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const login = useLogin();

  const onSubmit = (formData: LoginForm) => {
    login.mutate(
      { data: formData },
      {
        onSuccess: (response) => {
          setUser(response);
          toast.success('Usuário logado com sucesso!');
          navigator('/dashboard');
        },
      },
    );
  };

  return (
    <div className="h-full lg:grid lg:grid-cols-2">
      <div className="lg:bg-primary overflow-hidden border-b-2 px-4 py-10 lg:relative lg:grid lg:grid-rows-3 lg:border-r-2 lg:border-b-0 lg:pt-10 lg:pb-20 lg:text-white">
        <div>
          <div className="flex h-full flex-col items-center justify-center gap-10 py-10">
            <div className="w-full text-center">
              <p className="text-2xl lg:text-4xl">Aprenda inglês de forma</p>
              <AnimateBlock />
            </div>
          </div>
        </div>
        <img
          src="/img/register.svg"
          alt="Mulher comemorando e olhando no celular"
          className="absolute left-1/2 hidden w-screen -translate-x-1/2 md:top-30 lg:flex xl:-top-20"
        />
      </div>
      <img
        src="/assets/logo.svg"
        alt="Logo Fluveny"
        className="absolute left-1/2 m-auto mb-16 h-14 -translate-x-1/2 -translate-y-1/2 transform bg-white px-2 lg:hidden"
      />
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-[640px] flex-col justify-center space-y-6 px-4 pt-20 pb-10">
          <img
            src="/assets/logo.svg"
            alt="Logo Fluveny"
            className="mb-16 hidden h-14"
          />
          <h1 className="text-center text-xl font-semibold lg:text-2xl">
            Entre com a sua conta na Fluveny
          </h1>
          <FormProvider {...methods}>
            <form
              className="space-y-4"
              onSubmit={methods.handleSubmit(onSubmit)}
              id="register_student"
            >
              <RegisterCamp
                label="Nome de usuário"
                type="text"
                field="usernameOrEmail"
                hasError={!!methods.formState.errors.usernameOrEmail}
              />
              {methods.formState.errors.usernameOrEmail && (
                <p className="mt-1 text-sm text-red-500">
                  {methods.formState.errors.usernameOrEmail.message as string}
                </p>
              )}
              <PasswordInput
                label="Senha"
                field="password"
                hasError={!!methods.formState.errors.password}
              />
            </form>
          </FormProvider>
          <div className="space-y-4 py-4">
            <Button
              type="submit"
              className="w-full cursor-pointer py-7 text-xl font-bold"
              form="register_student"
            >
              Fazer Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
