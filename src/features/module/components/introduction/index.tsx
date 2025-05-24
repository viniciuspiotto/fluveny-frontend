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
import { useModuleInfo } from '../../store/use-module-info';

interface ModuleIntroductionFormProps {
  mode: StepMode;
}

export const Introduction = ({ mode }: ModuleIntroductionFormProps) => {
  const { moduleId } = useModuleInfo();
  const { setOnSubmit } = useConfirmModal();

  const { data: introductionData } = useGetIntroduction(
    moduleId,
    mode === 'edit',
  );

  const { mutate: updateIntroduction } = useUpdateIntroduction();
  const { mutate: createIntroduction } = useCreateIntroduction();

  const { methods } = useModuleIntroductionForm({ textBlock: '' });

  const { handleSubmit } = methods;

  const onSubmit = useCallback(
    (data: IntroductionData) => {
      if (mode === 'edit') {
        updateIntroduction({ moduleId, data });
      } else {
        createIntroduction({ moduleId, data });
      }
    },
    [mode, moduleId, updateIntroduction, createIntroduction],
  );

  useEffect(() => {
    setOnSubmit(handleSubmit(onSubmit));
  }, [handleSubmit, onSubmit, setOnSubmit]);

  return (
    <FormProvider {...methods}>
      <form className="mb-20">
        <Editor
          initialContent={
            mode === 'edit'
              ? introductionData?.data.textBlock.content
              : undefined
          }
        />
      </form>
    </FormProvider>
  );
};
