import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { AnimateBlock } from '../components/animate-block';
import { PasswordInput } from '../components/password-input';
import { RegisterCamp } from '../components/register-camp';

export const Register = () => {
  return (
    <div>
      <div className="relative space-y-8 border-b-2 px-4 pt-10 pb-20">
        <div className="flex gap-2">
          Já possui uma conta?{' '}
          <div className="group relative flex w-27 cursor-pointer items-center overflow-hidden underline">
            <span className="relative z-10 transition-transform duration-300 ease-in-out group-hover:translate-x-6">
              Faça login
            </span>

            <ArrowRight className="absolute top-1/2 right-0 size-5 -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:translate-x-full group-hover:opacity-0" />

            <ArrowRight className="absolute top-1/2 left-0 size-5 -translate-x-full -translate-y-1/2 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100" />
          </div>
        </div>
        <div className="w-full text-center">
          <p className="text-2xl">Aprenda inglês de forma</p>
          <AnimateBlock />
        </div>
      </div>
      <img
        src="/assets/logo.svg"
        alt="Logo Fluveny"
        className="absolute left-1/2 h-14 -translate-x-1/2 -translate-y-4/7 bg-white px-2"
      />
      <div className="w-full space-y-6 px-4 pt-20 pb-10">
        <h1 className="text-center text-xl font-semibold">
          Crie sua conta na Fluveny
        </h1>
        <form className="space-y-4">
          <RegisterCamp label="Nome de usuário" type="text" />
          <RegisterCamp label="E-mail" type="email" />
          <PasswordInput
            label="Senha"
            descriptions={[
              'A senha deve conter entre 8 a 16 caracteres',
              'A senha deve conter, pelo menos, um caractere especial, uma letra  maiúscula, e um número',
            ]}
          />
        </form>
        <div className="space-y-4 py-4">
          <Button
            type="submit"
            className="w-full cursor-pointer py-7 text-xl font-bold"
          >
            Criar usuário
          </Button>
          <p className="text-center text-sm text-zinc-500">
            Ao criar uma conta, você concorda com os{' '}
            <Link to={''} className="underline">
              Termos de Serviço
            </Link>
            . Para mais informações sobre as práticas de privacidade da Fluveny,
            consulte a{' '}
            <Link to={''} className="underline">
              Política de Privacidade da Fluveny
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
