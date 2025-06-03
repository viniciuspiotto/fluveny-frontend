import { Editor } from '@/components/editor';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useCreateGrammarRuleApresentation } from '../../hooks/use-create-grammar-rule-apresentation';
import { useConfirmModal } from '../../store/use-confirm-modal';
import { FormSectionWrapper } from '../details/form-section-wrapper';

export const GrammarRule = () => {
  const { setOnSubmit } = useConfirmModal();

  const { methods } = useCreateGrammarRuleApresentation();

  useEffect(() => {
    setOnSubmit(null);
  }, [setOnSubmit]);

  return (
    <FormProvider {...methods}>
      <form className="mb-20">
        <FormSectionWrapper label="Cabeçalho">
          <Input
            {...methods.register('sentence')}
            className="py-6 lg:text-lg"
            placeholder="Escreva aqui..."
          />
        </FormSectionWrapper>
        <FormSectionWrapper
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
      </form>
    </FormProvider>
  );
};
