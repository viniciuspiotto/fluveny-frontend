import type { StepMode } from '@/@types/module';
import { Editor } from '@/components/editor';
import { useCallback, useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useCreateIntroduction } from '../../hooks/api/mutations/use-create-introduction';
import { useUpdateIntroduction } from '../../hooks/api/mutations/use-update-introduction';
import { useGetIntroduction } from '../../hooks/api/queries/use-get-introduction';
import { useModuleIntroductionForm } from '../../hooks/use-module-introduction-form';
import type { IntroductionData } from '../../schemas/introduction-schema';
import { useConfirmModal } from '../../store/use-confirm-modal';
import { useFieldCompletion } from '../../store/use-field-completion';
import { useModuleInfo } from '../../store/use-module-info';
import { useModuleWizard } from '../../store/use-module-wizard';

interface ModuleIntroductionFormProps {
  mode: StepMode;
}

export const Introduction = ({ mode }: ModuleIntroductionFormProps) => {
  const { moduleId } = useModuleInfo();
  const { setOnSubmit } = useConfirmModal();
  const { setStepModes, setStepCompletion, currentStep, stepCompletion } =
    useModuleWizard();

  const { data: introductionData } = useGetIntroduction(
    moduleId,
    mode === 'edit',
  );

  const { mutate: updateIntroduction } = useUpdateIntroduction();
  const { mutate: createIntroduction } = useCreateIntroduction();

  const { methods } = useModuleIntroductionForm({ textBlock: '' });

  const { initializeStepFields, getIsStepFullyCompleted, fieldStatus } =
    useFieldCompletion();

  console.log(stepCompletion);

  useEffect(() => {
    if (currentStep) {
      initializeStepFields(currentStep, ['textBlock']);
    }
  }, [currentStep, initializeStepFields]);

  const { handleSubmit } = methods;

  const onSubmit = useCallback(
    (data: IntroductionData) => {
      if (mode === 'edit') {
        updateIntroduction({ moduleId, data });
      } else {
        createIntroduction({ moduleId, data });
        setStepModes('introduction', 'edit');
      }
    },
    [mode, moduleId, updateIntroduction, createIntroduction, setStepModes],
  );

  useEffect(() => {
    setOnSubmit(handleSubmit(onSubmit));
  }, [handleSubmit, onSubmit, setOnSubmit]);

  useEffect(() => {
    if (currentStep) {
      setStepCompletion(currentStep, getIsStepFullyCompleted(currentStep));
    }
  }, [getIsStepFullyCompleted, setStepCompletion, currentStep, fieldStatus]);

  return (
    <FormProvider {...methods}>
      <form className="mb-20">
        {mode === 'edit' && !introductionData?.data?.textBlock ? (
          <div className="py-10 text-center">Carregando introdução...</div>
        ) : (
          <Editor
            initialContent={
              mode === 'edit' && introductionData?.data?.textBlock
                ? introductionData.data.textBlock.content
                : undefined
            }
            registerCamp="textBlock"
            step="introduction"
          />
        )}
      </form>
    </FormProvider>
  );
};
