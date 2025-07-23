import { cn } from '@/app/utils/cn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormProvider } from 'react-hook-form';
import { useCreateGrammarRuleTranslateExercise } from '../../hooks/use-create-grammar-rule-translate-exercise';
import { FormSectionWrapper } from '../create/form-section-wrapper';

export const Exercise = () => {
  const { methods, onSubmit } = useCreateGrammarRuleTranslateExercise();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormSectionWrapper label="Cabeçalho">
          <Input
            {...methods.register('header')}
            className={cn(
              'py-6 lg:text-lg',
              methods.formState.errors.header &&
                'animate-shake border-red-500 text-red-500',
            )}
            placeholder="Escreva aqui..."
          />
          {methods.formState.errors.header && (
            <p className="mt-1 text-sm text-red-500">
              {methods.formState.errors.header.message as string}
            </p>
          )}
        </FormSectionWrapper>
        <FormSectionWrapper className="mb-6 lg:mb-8" label="Frase">
          <Input
            {...methods.register('phrase')}
            className={cn(
              'py-6 lg:text-lg',
              methods.formState.errors.phrase &&
                'animate-shake border-red-500 text-red-500',
            )}
            placeholder="Escreva aqui..."
          />
          {methods.formState.errors.phrase && (
            <p className="mt-1 text-sm text-red-500">
              {methods.formState.errors.phrase.message as string}
            </p>
          )}
        </FormSectionWrapper>
        <FormSectionWrapper className="mb-6 lg:mb-8" label="Gabarito">
          <Input
            {...methods.register('template')}
            className={cn(
              'py-6 lg:text-lg',
              methods.formState.errors.template &&
                'animate-shake border-red-500 text-red-500',
            )}
            placeholder="Escreva aqui..."
          />
          {methods.formState.errors.template && (
            <p className="mt-1 text-sm text-red-500">
              {methods.formState.errors.template.message as string}
            </p>
          )}
        </FormSectionWrapper>
        <FormSectionWrapper className="mb-6 lg:mb-8" label="Justificativa">
          <Textarea
            {...methods.register('justification')}
            placeholder="Escreva aqui..."
            className={cn(
              'min-h-40 py-4 lg:text-lg',
              methods.formState.errors.justification &&
                'animate-shake border-red-500 text-red-500',
            )}
          />
          {methods.formState.errors.justification && (
            <p className="mt-1 text-sm text-red-500">
              {methods.formState.errors.justification.message as string}
            </p>
          )}
        </FormSectionWrapper>
        <Button
          type="submit"
          className="mt-8 mb-24 w-full cursor-pointer py-8 text-xl font-bold"
          size="xl"
        >
          <span>Salvar</span>
        </Button>
      </form>
    </FormProvider>
  );
};
