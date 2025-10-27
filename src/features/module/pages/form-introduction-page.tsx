import { ROUTES } from '@/app/configs/routes';
import { Editor } from '@/components/editor';
import { Button } from '@/components/ui/button';
import { NotFound } from '@/templates/not-found';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import FormIntroductionPageSkeleton from '../components/introduction-page-skeleton';
import { ModuleHeader } from '../components/module-header';
import { useCreateIntroduction } from '../hooks/api/mutations/use-create-introduction';
import { useUpdateIntroduction } from '../hooks/api/mutations/use-update-introduction';
import { useGetAllGrammarRule } from '../hooks/api/queries/use-get-all-grammar-rule';
import { useGetIntroduction } from '../hooks/api/queries/use-get-introduction';
import {
  introductionFormSchema,
  type IntroductionForm,
} from '../schemas/introduction-schema';

export const FormIntroductionPage = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const { data: grammarRuleModuleInfo } = useGetAllGrammarRule(moduleId);
  const { data: introductionData, isLoading } = useGetIntroduction(moduleId);

  const isEditMode = !!introductionData;

  const methods = useForm<IntroductionForm>({
    resolver: zodResolver(introductionFormSchema),
    defaultValues: { textBlock: { content: '' } },
  });

  const updateIntroduction = useUpdateIntroduction();
  const createIntroduction = useCreateIntroduction();

  useEffect(() => {
    if (isEditMode && introductionData) {
      methods.reset({
        textBlock: introductionData.textBlock,
      });
    }
  }, [introductionData, isEditMode, methods]);

  if (isLoading) {
    return <FormIntroductionPageSkeleton />;
  }

  if (!moduleId || !grammarRuleModuleInfo) {
    return <NotFound />;
  }

  const onSubmit = (formData: IntroductionForm) => {
    if (isEditMode) {
      updateIntroduction.mutate(
        { moduleId, data: formData },
        {
          onSuccess: () => {
            toast.success('Introdução atualizada com sucesso!');
            const firstGrammarRule = grammarRuleModuleInfo[0];
            if (firstGrammarRule) {
              navigate(
                `${ROUTES.modules}/${ROUTES.create}/${moduleId}/${ROUTES.grammarRule}/${firstGrammarRule.id}`,
              );
            }
          },
        },
      );
    } else {
      createIntroduction.mutate(
        { moduleId, data: formData },
        {
          onSuccess: () => {
            toast.success('Introdução criada com sucesso!');
            const firstGrammarRule = grammarRuleModuleInfo[0];
            if (firstGrammarRule) {
              navigate(
                `${ROUTES.modules}/${ROUTES.create}/${moduleId}/${ROUTES.grammarRule}/${firstGrammarRule.id}`,
              );
            }
          },
        },
      );
    }
  };

  return (
    <>
      <ModuleHeader step={'Introdução'} />
      <div className="mx-auto flex w-full max-w-300 flex-col px-4 pb-8">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Editor
              error={methods.formState.errors.textBlock?.content}
              registerCamp="textBlock.content"
              initialContent={
                (isEditMode && introductionData?.textBlock.content) || ''
              }
            />
            <Button
              disabled={
                createIntroduction.isPending || updateIntroduction.isPending
              }
              type="submit"
              className="mt-8 mb-20 w-full cursor-pointer py-8 text-xl font-bold"
              size="xl"
            >
              <span>{isEditMode ? 'Editar' : 'Criar'}</span>
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
