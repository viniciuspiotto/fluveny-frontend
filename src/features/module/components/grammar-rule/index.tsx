import { Editor } from '@/components/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import { useCreateGrammarRuleApresentation } from '../../hooks/use-create-grammar-rule-apresentation';
import { FormSectionWrapper } from '../create/form-section-wrapper';
import { ContentWindow } from './content-window';

export const GrammarRule = () => {
  const { methods, onSubmit } = useCreateGrammarRuleApresentation();

  return (
    <FormProvider {...methods}>
      <form
        className="mb-20 lg:mb-24"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <FormSectionWrapper label="Cabeçalho">
          <Input
            {...methods.register('sentence')}
            className="py-6 lg:text-lg"
            placeholder="Escreva aqui..."
          />
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
          <Editor registerCamp="description" />
        </FormSectionWrapper>
        <Button
          type="submit"
          className="mt-8 mb-24 w-full cursor-pointer py-8 text-xl font-bold"
          size="xl"
        >
          <span>Salvar</span>
        </Button>
      </form>
      <ContentWindow />
    </FormProvider>
  );
};
