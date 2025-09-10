import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { AnimateBlock } from '../components/animate-block';
import { PasswordInput } from '../components/password-input';
import { RegisterCamp } from '../components/register-camp';
import { useCreateStudent } from '../hooks/register-student';
import {
  registerStudentFormSchema,
  type RegisterStudentForm,
} from '../schemas/register-student-schema';

export const Register = () => {
  const methods = useForm<RegisterStudentForm>({
    resolver: zodResolver(registerStudentFormSchema),
  });

  const createStudent = useCreateStudent();

  const onSubmit = (formData: RegisterStudentForm) => {
    createStudent.mutate(
      { data: formData },
      {
        onSuccess: () => {
          toast.success('Usuário criado com sucesso!');
        },
      },
    );
  };

  return (
    <div className="h-full lg:grid lg:grid-cols-2">
      <div className="lg:bg-primary overflow-hidden border-b-2 px-4 py-10 lg:relative lg:grid lg:grid-rows-3 lg:border-r-2 lg:border-b-0 lg:pt-10 lg:pb-20 lg:text-white">
        <div>
          <Link to={'/login'} className="flex gap-2 lg:text-lg">
            Já possui uma conta?{' '}
            <div className="group text-primary relative flex w-27 cursor-pointer items-center overflow-hidden underline lg:w-29 lg:text-white">
              <span className="relative z-10 transition-transform duration-300 ease-in-out group-hover:translate-x-6">
                Faça login
              </span>

              <ArrowRight className="absolute top-1/2 right-0 size-5 -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:translate-x-full group-hover:opacity-0" />

              <ArrowRight className="absolute top-1/2 left-0 size-5 -translate-x-full -translate-y-1/2 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100" />
            </div>
          </Link>
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
          className="absolute bottom-0 left-1/2 hidden w-screen -translate-x-1/2 lg:-bottom-50 lg:flex"
        />
      </div>
      <img
        src="/assets/logo.svg"
        alt="Logo Fluveny"
        className="absolute top-56 left-1/2 m-auto mb-16 h-14 -translate-x-1/2 transform bg-white px-2 lg:hidden"
      />
      <div className="flex w-full items-center justify-center">
        <div className="flex w-full max-w-[640px] flex-col justify-center space-y-6 px-4 pt-20 pb-10">
          <img
            src="/assets/logo.svg"
            alt="Logo Fluveny"
            className="mb-16 hidden h-14"
          />
          <h1 className="text-center text-xl font-semibold lg:text-2xl">
            Crie sua conta na Fluveny
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
                field="username"
                hasError={!!methods.formState.errors.username}
              />
              {methods.formState.errors.username && (
                <p className="mt-1 text-sm text-red-500">
                  {methods.formState.errors.username.message as string}
                </p>
              )}
              <RegisterCamp
                label="E-mail"
                type="email"
                field="email"
                hasError={!!methods.formState.errors.email}
              />
              {methods.formState.errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {methods.formState.errors.email.message as string}
                </p>
              )}
              <PasswordInput
                label="Senha"
                descriptions={[
                  'A senha deve conter entre 8 a 200 caracteres',
                  'A senha deve conter, pelo menos, um caractere especial, uma letra  maiúscula, uma letra minúscula, e um número',
                ]}
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
              Criar usuário
            </Button>
            <p className="text-center text-sm text-zinc-500">
              Ao criar uma conta, você concorda com os{' '}
              <Link to={''} className="underline">
                Termos de Serviço
              </Link>
              . Para mais informações sobre as práticas de privacidade da
              Fluveny, consulte a{' '}
              <Link to={''} className="underline">
                Política de Privacidade da Fluveny
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
