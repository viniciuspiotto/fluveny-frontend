import { Editor } from '@/components/editor';
import { useCallback, useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useCreateIntroduction } from '../../hooks/api/mutations/use-create-introduction';
import { useModuleIntroductionForm } from '../../hooks/use-module-introduction-form';
import type { IntroductionData } from '../../schemas/introduction-schema';
import { useConfirmModal } from '../../store/use-confirm-modal';
import { useFieldCompletion } from '../../store/use-field-completion';
import { useModuleInfo } from '../../store/use-module-info';
import { useModuleWizard } from '../../store/use-module-wizard';

export const Introduction = () => {
  const { moduleId } = useModuleInfo();
  const { setOnSubmit } = useConfirmModal();
  const { setStepModes, setStepCompletion, currentStep } = useModuleWizard();

  const { mutate: createIntroduction } = useCreateIntroduction();

  const { methods } = useModuleIntroductionForm({ textBlock: '' });

  const { initializeStepFields, getIsStepFullyCompleted, fieldStatus } =
    useFieldCompletion();

  useEffect(() => {
    if (currentStep) {
      initializeStepFields(currentStep, ['textBlock']);
    }
  }, [currentStep, initializeStepFields]);

  const { handleSubmit } = methods;

  const onSubmit = useCallback(
    (data: IntroductionData) => {
      createIntroduction({ moduleId, data });
      setStepModes('introduction', 'edit');
    },
    [moduleId, createIntroduction, setStepModes],
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
        <Editor registerCamp="textBlock" step="introduction" />
      </form>
    </FormProvider>
  );
};
