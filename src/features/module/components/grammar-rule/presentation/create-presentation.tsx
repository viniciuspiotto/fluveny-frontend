import { cn } from '@/app/utils/cn';
import { Editor } from '@/components/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import { useCreateGrammarRulePresentation } from '../../../hooks/use-create-grammar-rule-apresentation';
import { FormSectionWrapper } from '../../create/form-section-wrapper';

export const CreatePresentation = () => {
  const { methods, onSubmit } = useCreateGrammarRulePresentation();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormSectionWrapper label="Cabeçalho">
          <Input
            {...methods.register('title')}
            className={cn(
              'py-6 lg:text-lg',
              methods.formState.errors.title &&
                'animate-shake border-red-500 text-red-500',
            )}
            placeholder="Escreva aqui..."
          />
          {methods.formState.errors.title && (
            <p className="mt-1 text-sm text-red-500">
              {methods.formState.errors.title.message as string}
            </p>
          )}
        </FormSectionWrapper>
        <FormSectionWrapper
          className="mb-6 lg:mb-8"
          label={
            <div className="flex items-center gap-2">
              Descrição
              <Info
                className="text-primary cursor-pointer"
                onClick={() => console.log('cliquei')}
              />
            </div>
          }
        >
          <Editor
            registerCamp="textBlock"
            error={methods.formState.errors.textBlock?.message}
          />
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
