import { Editor } from '@/components/editor';
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useCreateGrammarRuleApresentation } from '../../hooks/use-create-grammar-rule-apresentation';
import type { GrammarRuleApresentationData } from '../../schemas/grammar-rule-apresentation-schema';
import { useConfirmModal } from '../../store/use-confirm-modal';
import { useFieldCompletion } from '../../store/use-field-completion';
import { useModuleWizard } from '../../store/use-module-wizard';
import { FormSectionWrapper } from '../create/form-section-wrapper';
import { ContentWindow } from './content-window';

export const GrammarRule = () => {
  const { setOnSubmit } = useConfirmModal();
  const { methods } = useCreateGrammarRuleApresentation();
  const { currentStep, setStepCompletion } = useModuleWizard();
  const {
    initializeStepFields,
    setFieldCompletion,
    getIsStepFullyCompleted,
    fieldStatus,
    resetStepFields,
  } = useFieldCompletion();

  const { handleSubmit } = methods;

  const onSubmit = useCallback((data: GrammarRuleApresentationData) => {
    console.log(data);
  }, []);

  const sentenceValue = methods.watch('sentence');

  useEffect(() => {
    if (currentStep) {
      setOnSubmit(handleSubmit(onSubmit));
      resetStepFields(currentStep);
      initializeStepFields(currentStep, ['sentence', 'description']);
    }
  }, [
    setOnSubmit,
    currentStep,
    initializeStepFields,
    resetStepFields,
    handleSubmit,
    onSubmit,
  ]);

  useEffect(() => {
    if (currentStep) {
      const isFilled = !!sentenceValue && sentenceValue.trim().length > 0;
      setFieldCompletion(currentStep, 'sentence', isFilled);
    }
  }, [sentenceValue, currentStep, setFieldCompletion]);

  useEffect(() => {
    if (currentStep) {
      setStepCompletion(currentStep, getIsStepFullyCompleted(currentStep));
    }
  }, [getIsStepFullyCompleted, setStepCompletion, currentStep, fieldStatus]);

  return (
    <FormProvider {...methods}>
      <form className="mb-40">
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
          <Editor
            step={currentStep || 'desconhecido'}
            registerCamp="description"
          />
        </FormSectionWrapper>
      </form>
      <ContentWindow />
    </FormProvider>
  );
};
