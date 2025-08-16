import { cn } from '@/app/utils/cn';
import { Editor } from '@/components/editor';
import { NotFound } from '@/components/not-found';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { FormSectionWrapper } from '../components/form-section-wrapper';
import { ModuleHeader } from '../components/module-header';
import FormPresentationPageSkeleton from '../components/presentation-page-skeleton';
import { useCreatePresentation } from '../hooks/api/mutations/use-create-presentation';
import { useUpdatePresentation } from '../hooks/api/mutations/use-update-presentation';
import { useGetPresentation } from '../hooks/api/queries/use-get-presentation';
import {
  presentationSchema,
  type PresentationForm,
} from '../schemas/presentation-schema';
import { useGrammarRuleModuleWindows } from '../stores/use-grammar-rule-module-windows';

export const FormPresentationPage = () => {
  const { windowId, moduleId, grammarRuleId } = useParams();

  const { windowsList, currentPosition, setWindowsList, updateDraftData } =
    useGrammarRuleModuleWindows();

  const methods = useForm<PresentationForm>({
    resolver: zodResolver(presentationSchema),
    defaultValues: { title: '', textBlock: { content: '' } },
  });

  const { data: presentationData, isLoading } = useGetPresentation({
    windowId,
    moduleId,
    grammarRuleId,
  });

  const isEditMode = !!windowId;

  const currentWindow =
    currentPosition !== null ? windowsList[currentPosition] : undefined;
  const draftData =
    currentWindow?.type === 'PRESENTATION'
      ? (currentWindow.draftData as Partial<PresentationForm>)
      : undefined;

  useEffect(() => {
    if (isEditMode && presentationData) {
      methods.reset({
        title: presentationData.title,
      });
    } else if (!isEditMode && draftData) {
      methods.reset({
        title: draftData.title || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presentationData, isEditMode, methods]);

  const handleSaveDraftOnBlur = () => {
    if (!isEditMode && currentPosition !== null) {
      const currentValues = methods.getValues();
      updateDraftData(currentPosition, currentValues);
    }
  };

  const createPresentation = useCreatePresentation();
  const updatePresentation = useUpdatePresentation();

  if (isLoading) return <FormPresentationPageSkeleton />;

  if (!moduleId || !grammarRuleId) return <NotFound />;

  const onSubmit = (formData: PresentationForm) => {
    if (isEditMode && presentationData) {
      updatePresentation.mutate({
        moduleId,
        grammarRuleId,
        windowId,
        data: formData,
      });
    } else {
      createPresentation.mutate(
        { moduleId, grammarRuleId, data: formData },
        {
          onSuccess: (newCreatedWindow) => {
            if (currentPosition === null) return;
            const newList = [...windowsList];

            const clientId = newList[currentPosition]?.clientId;

            newList[currentPosition] = {
              id: newCreatedWindow.id,
              type: 'PRESENTATION',
              clientId,
              draftData: {},
            };

            setWindowsList(newList);
          },
        },
      );
    }
  };

  return (
    <>
      <ModuleHeader step={'Apresentação'} />
      <div className="mx-auto mb-30 flex w-full max-w-300 flex-col px-4 pb-8">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormSectionWrapper
              className="mb-6 lg:mb-8"
              label={<div className="flex items-center gap-2">Título</div>}
            >
              <Input
                {...methods.register('title')}
                onBlur={handleSaveDraftOnBlur}
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
                  <Info className="text-primary cursor-pointer" />
                </div>
              }
            >
              <Editor
                error={methods.formState.errors.textBlock?.content}
                registerCamp="textBlock.content"
                initialContent={
                  (isEditMode && presentationData?.textBlock.content) ||
                  draftData?.textBlock?.content ||
                  ''
                }
              />
            </FormSectionWrapper>
            <Button
              type="submit"
              className="mt-8 mb-24 w-full cursor-pointer py-8 text-xl font-bold"
              size="xl"
            >
              <span>{isEditMode ? 'Editar' : 'Salvar'}</span>
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
